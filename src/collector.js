// Base URL for the proxy server
const BASE_URL = "http://localhost:3000";

class GithubDataCollector {
  constructor() {
    console.log("HI");
    this.cache = new Map();
    this.lastRequestTime = 0;
    this.RATE_LIMIT_DELAY = 3000; // 3 seconds
    this.stats_retry_count = 0;
    this.STATS_RETRY_DELAY = 3000; // 3 seconds
  }

  async rateLimitedFetch(url) {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest)
      );
    }

    this.lastRequestTime = Date.now();
    return fetch(url, { headers: { Connection: "close" } });
  }

  async fetchGitHub(endpoint) {
    if (this.cache.has(endpoint)) {
      return this.cache.get(endpoint);
    }

    try {
      let response = await this.rateLimitedFetch(`${BASE_URL}${endpoint}`);

      // If stats are being computed (202 Accepted), wait and retry.
      if (
        this.stats_retry_count < 10 &&
        response.status === 202 &&
        endpoint.includes("/stats/")
      ) {
        this.stats_retry_count += 1;
        await new Promise((resolve) =>
          setTimeout(resolve, this.STATS_RETRY_DELAY)
        );
        // Corrected the typo from fetchGithub to this.rateLimitedFetch
        response = await this.rateLimitedFetch(`${BASE_URL}${endpoint}`);
      }

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `HTTP error! status: ${response.status} for endpoint: ${endpoint}`,
          errorBody
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseClone = response.clone();
      try {
        const data = await response.json();
        this.cache.set(endpoint, data);
        return data;
      } catch (e) {
        const text = await responseClone.text();
        console.error(`Failed to parse JSON for endpoint: ${endpoint}`);
        console.error("Response text:", text);
        return null;
      }
    } catch (error) {
      console.error(`Error in fetchGitHub for ${endpoint}:`, error);
      return null;
    }
  }

  async getRepoInfo(owner, repo) {
    const repoData = await this.fetchGitHub(`/repos/${owner}/${repo}`);
    if (!repoData)
      return {
        created: "",
        stars: "",
        forks: "",
        watching: "",
      };

    return {
      created: new Date(repoData.created_at).toLocaleDateString(),
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      watching: repoData.subscribers_count,
    };
  }

  async fetchAllPages(endpoint, { stopDate, dateExtractor } = {}) {
    let allItems = [];
    let page = 1;
    const perPage = 100;
    const separator = endpoint.includes("?") ? "&" : "?";

    while (true) {
      const url = `${endpoint}${separator}page=${page}&per_page=${perPage}`;
      const items = await this.fetchGitHub(url);

      if (!items || items.length === 0) {
        break;
      }

      allItems = allItems.concat(items);

      if (stopDate && dateExtractor) {
        const lastItem = items[items.length - 1];
        if (lastItem) {
          const itemDate = dateExtractor(lastItem);
          if (itemDate && new Date(itemDate) < stopDate) {
            break;
          }
        }
      }

      if (items.length < perPage) {
        break;
      }

      page++;
    }

    if (stopDate && dateExtractor) {
      return allItems.filter((item) => {
        const date = dateExtractor(item);
        return date && new Date(date) >= stopDate;
      });
    }

    return allItems;
  }

  async getPulseMetrics(owner, repo) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    oneYearAgo.setHours(0, 0, 0, 0);

    const [pulls, issues, commits] = await Promise.all([
      this.fetchAllPages(`/repos/${owner}/${repo}/pulls?state=all`, {
        stopDate: oneYearAgo,
        dateExtractor: (item) => item.created_at,
      }),
      this.fetchAllPages(`/repos/${owner}/${repo}/issues?state=all`, {
        stopDate: oneYearAgo,
        dateExtractor: (item) => item.created_at,
      }),
      this.fetchAllPages(
        `/repos/${owner}/${repo}/commits?since=${oneYearAgo.toISOString()}`
      ),
    ]);

    const processMetrics = (data, months) => {
      const timeframe = new Date();
      timeframe.setMonth(timeframe.getMonth() - months);

      const metrics = {
        newIssues: 0,
        inactiveIssues: 0,
        closedIssues: 0,
        resolvedIssues: 0,
        newPRs: 0,
        inactivePRs: 0,
        closedPRs: 0,
        mergedPRs: 0,
        activeContributors: 0,
      };

      if (data.pulls) {
        metrics.newPRs = data.pulls.filter(
          (pr) => new Date(pr.created_at) > timeframe
        ).length;
        metrics.closedPRs = data.pulls.filter(
          (pr) =>
            !pr.merged_at && pr.closed_at && new Date(pr.closed_at) > timeframe
        ).length;
        metrics.mergedPRs = data.pulls.filter(
          (pr) => pr.merged_at && new Date(pr.merged_at) > timeframe
        ).length;
        metrics.inactivePRs = data.pulls.filter(
          (pr) => pr.state === "open" && new Date(pr.updated_at) < timeframe
        ).length;
      }

      if (data.issues) {
        metrics.newIssues = data.issues.filter(
          (issue) => new Date(issue.created_at) > timeframe
        ).length;
        metrics.closedIssues = data.issues.filter(
          (issue) =>
            issue.state_reason === "not_planned" &&
            new Date(issue.closed_at) > timeframe
        ).length;
        metrics.resolvedIssues = data.issues.filter(
          (issue) =>
            issue.state_reason !== "not_planned" &&
            new Date(issue.closed_at) > timeframe
        ).length;
        metrics.inactiveIssues = data.issues.filter(
          (issue) =>
            issue.state === "open" && new Date(issue.updated_at) < timeframe
        ).length;
      }

      if (data.commits) {
        const activeContributorLogins = new Set();
        data.commits.forEach((commit) => {
          if (
            commit.author &&
            commit.commit.author &&
            new Date(commit.commit.author.date) > timeframe
          ) {
            activeContributorLogins.add(commit.author.login);
          }
        });
        metrics.activeContributors = activeContributorLogins.size;
      }

      return metrics;
    };

    const allData = { pulls, issues, commits };

    return {
      "3m": processMetrics(allData, 3),
      "6m": processMetrics(allData, 6),
      "1y": processMetrics(allData, 12),
    };
  }

  async getHealthStatus(owner, repo) {
    const communityProfile = await this.fetchGitHub(
      `/repos/${owner}/${repo}/community/profile`
    );
    if (!communityProfile) return {};

    return {
      health_score: communityProfile.health_percentage,
      description: !!communityProfile.description,
      documentation: !!communityProfile.documentation,
      readme: !!communityProfile.files.readme,
      codeOfConduct: !!communityProfile.files.code_of_conduct,
      contributing: !!communityProfile.files.contributing,
      license: !!communityProfile.files.license,
      securityPolicy: !!communityProfile.files.security,
      issueTemplates: !!communityProfile.files.issue_template,
      prTemplates: !!communityProfile.files.pull_request_template,
      contentReports: !!communityProfile.content_reports_enabled,
    };
  }

  async getContributionStats(owner, repo) {
    const stats = await this.fetchGitHub(
      `/repos/${owner}/${repo}/stats/contributors`
    );

    if (!stats) return { "3m": [], "6m": [], "1y": [] };

    if (!Array.isArray(stats)) {
      if (typeof stats === "object" && stats.author) {
        const contributor = {
          contributor:
            stats.author && stats.author.login ? stats.author.login : "",
          contributions: typeof stats.total === "number" ? stats.total : 0,
        };
        return {
          "3m": [contributor],
          "6m": [contributor],
          "1y": [contributor],
        };
      }
      return { "3m": [], "6m": [], "1y": [] };
    }

    const processStats = (months) => {
      const timeframe = new Date();
      timeframe.setMonth(timeframe.getMonth() - months);
      const timeframeTimestamp = Math.floor(timeframe.getTime() / 1000);

      return stats
        .map((contributor) => {
          const contributionsInFrame = contributor.weeks
            .filter((week) => week.w >= timeframeTimestamp)
            .reduce((acc, week) => acc + week.c, 0);

          return {
            contributor: contributor.author ? contributor.author.login : "",
            contributions: contributionsInFrame,
          };
        })
        .filter((c) => c.contributions > 0);
    };

    return {
      "3m": processStats(3),
      "6m": processStats(6),
      "1y": processStats(12),
    };
  }

  async getCodeFrequency(owner, repo) {
    const frequency = await this.fetchGitHub(
      `/repos/${owner}/${repo}/stats/code_frequency`
    );
    if (!frequency || !Array.isArray(frequency) || frequency.length === 0) {
      return { "3m": [], "6m": [], "1y": [] };
    }

    const allWeeksData = frequency.map((weekData) => {
      const [timestamp, additions, deletions] = weekData;
      return { timestamp, additions, deletions };
    });

    const processFrequency = (months) => {
      const timeframe = new Date();
      timeframe.setMonth(timeframe.getMonth() - months);
      const timeframeTimestamp = Math.floor(timeframe.getTime() / 1000);

      return allWeeksData
        .filter((week) => week.timestamp >= timeframeTimestamp)
        .map((week) => {
          const date = new Date(week.timestamp * 1000);
          return {
            week: date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            lines: week.additions - week.deletions,
            additions: week.additions,
            deletions: week.deletions,
          };
        });
    };

    return {
      "3m": processFrequency(3),
      "6m": processFrequency(6),
      "1y": processFrequency(12),
    };
  }

  async getReleaseInfo(owner, repo) {
    const releases = await this.fetchGitHub(`/repos/${owner}/${repo}/releases`);
    if (!releases || releases.length === 0) {
      return { lastRelease: "N/A", frequency: "N/A" };
    }

    const lastRelease = new Date(releases[0].published_at).toLocaleDateString();

    if (releases.length > 1) {
      const dates = releases.map((r) => new Date(r.published_at));
      const timeDiffs = [];
      for (let i = 1; i < dates.length; i++) {
        timeDiffs.push(dates[i - 1] - dates[i]);
      }
      const avgDays = Math.round(
        timeDiffs.reduce((a, b) => a + b, 0) /
          timeDiffs.length /
          (1000 * 60 * 60 * 24)
      );
      return {
        lastRelease,
        frequency: `${avgDays} days`,
      };
    }

    return {
      lastRelease,
      frequency: "N/A",
    };
  }

  async collectRepositoryData(owner, repo) {
    const [
      repoInfo,
      pulseMetrics,
      healthStatus,
      contributionStats,
      codeFrequency,
      releaseInfo,
    ] = await Promise.all([
      this.getRepoInfo(owner, repo),
      this.getPulseMetrics(owner, repo),
      this.getHealthStatus(owner, repo),
      this.getContributionStats(owner, repo),
      this.getCodeFrequency(owner, repo),
      this.getReleaseInfo(owner, repo),
    ]);

    return {
      repoInfo,
      pulseMetrics,
      healthStatus,
      contributionStats,
      codeFrequency,
      releaseInfo,
    };
  }

  async testDataCollection(owner, repo) {
    console.log(`Starting data collection test for ${owner}/${repo}`);
    console.log("----------------------------------------");

    try {
      const allData = await this.collectRepositoryData(owner, repo);
      console.log(JSON.stringify(allData, null, 2));
      console.log("----------------------------------------");
      console.log("All data collected successfully!");
    } catch (error) {
      console.error("Error during test:", error);
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

// Export a singleton instance
export const githubCollector = new GithubDataCollector();

// Export the class for testing or if multiple instances are needed
export { GithubDataCollector };
