import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

import { Users, CircleDot, GitPullRequest, Tags } from "lucide-react";

import { Loader } from "./Loader"
import { githubCollector } from "./collector";

// Dummy data for histogram of contributions
const contributionsData = [
  { contributor: "A", contributions: 50 },
  { contributor: "B", contributions: 10 },
  { contributor: "C", contributions: 30 },
  { contributor: "D", contributions: 20 },
  { contributor: "E", contributions: 70 },
  { contributor: "F", contributions: 15 }
];

// Dummy data for total lines of code over time
const totalLinesData = [
  { week: "W1", lines: 1000 },
  { week: "W2", lines: 1100 },
  { week: "W3", lines: 1050 },
  { week: "W4", lines: 1250 },
  { week: "W5", lines: 1300 },
  { week: "W6", lines: 1500 },
  { week: "W7", lines: 1700 },
  { week: "W8", lines: 1600 }
];

export const MetricCard = (props) => {
  let Icon = props.icon;
  return (
    <div className="m-1 p-1 border rounded-xl shadow-sm hover:shadow-lg transition flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon
            className="text-gray-600"
            size={20}
          />
          <span className="text-md font-semibold text-gray-700">{props.title}</span>
        </div>
        <div className="grow-1 text-center text-3xl font-bold">{props.children}</div>
    </div>
  );
};

const Title = (props) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-1 flex-col">
        <div className="text-3xl font-bold">{props.title}</div>
        <div className="text-sm text-gray-600">
          Created: {props.created || "XX-XX-XXXX"}
        </div>
      </div>
      <div className="flex gap-3 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="text-sm text-gray-600">Stars</div>
          <div className="text-xl font-bold">{props.stars || "N/A"}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-sm text-gray-600">Forks</div>
          <div className="text-xl font-bold">{props.forks || "N/A"}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-sm text-gray-600">Watching</div>
          <div className="text-xl font-bold">{props.watching || "N/A"}</div>
        </div>
        {/* <div className="flex flex-col justify-center items-center">
          <div className="text-sm text-gray-600">Commits</div>
          <div className="text-xl font-bold">{props.watching || "N/A"}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-sm text-gray-600">Releases</div>
          <div className="text-xl font-bold">{props.watching || "N/A"}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-sm text-gray-600">Contributors</div>
          <div className="text-xl font-bold">{props.watching || "N/A"}</div>
        </div> */}
      </div>
    </div>
  );
};

const Pulse = ({ pulseMetrics, releaseInfo, timeRange}) => {
  const [windows, window, setWindow] = timeRange;
  pulseMetrics = pulseMetrics[window];

  return (
    <div className="flex flex-col justify-between items-center w-full gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-bold">Pulse</div>
        <div className="flex gap-3 justify-center items-center mr-4">
          <div className="flex flex-col justify-center items-center">
            <div className="text-sm text-gray-600">Window</div>
            <div className="flex justify-between items-center">
              {windows.map((option) => (
                <button
                  key={option}
                  onClick={() => setWindow(option)}
                  className={`px-2 py-1 text-sm rounded-md font-medium transition-colors duration-400
              ${
                window === option
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-2 flex items-center flex-wrap gap-3 w-full">
        <MetricCard icon={GitPullRequest} title="New PRs">
          {pulseMetrics.newPRs}
        </MetricCard>
        <MetricCard icon={GitPullRequest} title="Inactive PRs">
          {pulseMetrics.inactivePRs}
        </MetricCard>
        <MetricCard icon={GitPullRequest} title="Closed PRs">
          {pulseMetrics.closedPRs}
        </MetricCard>
        <MetricCard icon={GitPullRequest} title="Merged PRs">
          {pulseMetrics.mergedPRs}
        </MetricCard>
        <MetricCard icon={CircleDot} title="New Issues">
          {pulseMetrics.newIssues}
        </MetricCard>
        <MetricCard icon={CircleDot} title="Inactive Issues">
          {pulseMetrics.inactiveIssues}
        </MetricCard>
        <MetricCard icon={CircleDot} title="Closed Issues">
          {pulseMetrics.closedIssues}
        </MetricCard>
        <MetricCard icon={CircleDot} title="Resolved Issues">
          {pulseMetrics.resolvedIssues}
        </MetricCard>
        <MetricCard icon={Users} title="Active Contributors">
          {pulseMetrics.activeContributors}
        </MetricCard>
        <MetricCard icon={Tags} title="Release Frequency">
          {releaseInfo.frequency}
        </MetricCard>
        <MetricCard icon={Tags} title="Last Release">
          {releaseInfo.lastRelease}
        </MetricCard>

        {/* <MetricCard icon={GitPullRequest} title="Median Response Time">
          {pulseMetrics.medianResponseTime}
        </MetricCard>
        <MetricCard icon={GitPullRequest} title="Median Review Time">
          {pulseMetrics.medianReviewTime}
        </MetricCard>
        <MetricCard icon={GitPullRequest} title="Median Close Time">
          {pulseMetrics.medianCloseTime}
        </MetricCard> */}

      </div>
    </div>
  );
};

const Health = ({ healthStatus }) => {
  return (
    <div className="flex flex-col justify-between items-center w-full gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-bold">Health</div>
        <div className="text-xl font-semibold text-gray-600">Score: {healthStatus.health_score}</div>  
      </div>
      <div className="ml-2 flex items-center flex-wrap gap-3 w-full">
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.readme
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          README
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.codeOfConduct
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          CODE OF CONDUCT
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.contributing
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          CONTRIBUTING
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.license
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          LICENSE
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.securityPolicy
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Security Policy
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.issueTemplates
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Issue Templates
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.prTemplates
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Pull Request Templates
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.contentReports
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Content Reports
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.description
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Description
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" + " " + (healthStatus.documentation
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Documentation
        </div>
      </div>
    </div>
  );
};

const Trends = ({ contributionStats, codeFrequency, timeRange }) => {
  const [windows, window, setWindow] = timeRange;
  contributionStats = contributionStats[window];
  codeFrequency = codeFrequency[window];

  return (
    <div className="flex flex-col justify-between items-center w-full gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-bold">Trends</div>
      </div>
      <div className="ml-2 flex items-center flex-wrap gap-3 w-full">
          {/* Contributions Histogram */}
          <div className="grow-1 rounded-xl p-2 shadow-sm hover:shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Contributions Distribution</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={contributionStats}>
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <XAxis dataKey="contributor" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <Bar dataKey="contributions" fill="#ccc" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

         {/* Total Lines of Code */}
          <div className="grow-1 rounded-xl p-2 shadow-sm hover:shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Total Lines of Code Over Time</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={codeFrequency}>
                <Tooltip cursor={{ stroke: "#9ca3af", strokeWidth: 1 }} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <Line
                  type="monotone"
                  dataKey="lines"
                  stroke="#ccc"
                  strokeWidth={3}
                  dot={{ r: 4, stroke: "#ccc", strokeWidth: 2, fill: "white" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

// Dashboard :)
const Dashboard = (props) => {
  const [stats, setStats] = useState(false);
  const windows = ["3m", "6m", "1y"];
  const [window, setWindow] = useState("3m");
  const timeRange = [windows, window, setWindow];

  useEffect(() => {
    const fetchData = async () => {
      const data = await githubCollector.collectRepositoryData(props.owner, props.repo);
      setStats(data);
    };


    fetchData();
  }, []);

  if (!stats) {
    return <Loader />;
  }

  const {
    repoInfo,
    pulseMetrics,
    healthStatus,
    contributionStats,
    codeFrequency,
    releaseInfo
  } = stats;

  return (
    <div className="flex flex-col gap-3 justify-around items-center w-full">
      <Title
        title={`${props.owner}/${props.repo}`}
        created={repoInfo.created}
        stars={repoInfo.stars}
        forks={repoInfo.forks}
        watching={repoInfo.watching}
      />
      <Health healthStatus={healthStatus} />
      <Pulse pulseMetrics={pulseMetrics} releaseInfo={releaseInfo} timeRange={timeRange} />
      <Trends contributionStats={contributionStats} codeFrequency={codeFrequency} timeRange={timeRange} />
    </div>
  );
};

export default Dashboard;
