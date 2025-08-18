import { useState, useEffect } from "react";

import { githubCollector } from "./collector";

import { Loader } from "./Loader.jsx";
import { Title } from "./Title.jsx";
import { Health } from "./Health.jsx";
import { Pulse } from "./Pulse.jsx";
import { Trends } from "./Trends.jsx";

// Dashboard :)
const Dashboard = (props) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await githubCollector.collectRepositoryData(
          props.owner,
          props.repo
        );
        setStats(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.owner, props.repo]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">An error occurred: {error.message}</div>;
  }

  if (!stats) {
    return <div>No data available.</div>;
  }

  const {
    repoInfo,
    pulseMetrics,
    healthStatus,
    topContributors,
    contributionDistribution,
    codeFrequency,
    releaseInfo,
  } = stats;

  return (
    <div className="flex flex-col gap-3 justify-around items-center w-full">
      <Title
        title={`${props.owner}/${props.repo}`}
        created={repoInfo.created}
        stars={repoInfo.stars}
        forks={repoInfo.forks}
        watching={repoInfo.watching}
        releaseInfo={releaseInfo}
      />
      <Health healthStatus={healthStatus} />
      <Pulse
        pulseMetrics={pulseMetrics}
      />
      <Trends
        contributionDistribution={contributionDistribution}
        topContributors={topContributors}
        codeFrequency={codeFrequency}
      />
    </div>
  );
};

export default Dashboard;