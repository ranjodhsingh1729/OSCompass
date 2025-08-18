import { useState } from "react";
import { MetricCard } from "./Card";
import { Users, CircleDot, GitPullRequest, Tags } from "lucide-react";

export const Pulse = ({ pulseMetrics }) => {
  const windows = ["3m", "6m", "1y"];
  const [window, setWindow] = useState("3m");
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
        <MetricCard
          icon={GitPullRequest}
          title="New PRs"
        >
          {pulseMetrics.newPRs}
        </MetricCard>
        <MetricCard
          icon={GitPullRequest}
          title="Inactive PRs"
        >
          {pulseMetrics.inactivePRs}
        </MetricCard>
        <MetricCard
          icon={GitPullRequest}
          title="Closed PRs"
        >
          {pulseMetrics.closedPRs}
        </MetricCard>
        <MetricCard
          icon={GitPullRequest}
          title="Merged PRs"
        >
          {pulseMetrics.mergedPRs}
        </MetricCard>
        <MetricCard
          icon={CircleDot}
          title="New Issues"
        >
          {pulseMetrics.newIssues}
        </MetricCard>
        <MetricCard
          icon={CircleDot}
          title="Inactive Issues"
        >
          {pulseMetrics.inactiveIssues}
        </MetricCard>
        <MetricCard
          icon={CircleDot}
          title="Closed Issues"
        >
          {pulseMetrics.closedIssues}
        </MetricCard>
        <MetricCard
          icon={CircleDot}
          title="Resolved Issues"
        >
          {pulseMetrics.resolvedIssues}
        </MetricCard>
        <MetricCard
          icon={Users}
          title="Active Contributors"
        >
          {pulseMetrics.activeContributors}
        </MetricCard>
        {/* <MetricCard
          icon={Tags}
          title="Release Frequency"
        >
          {releaseInfo.frequency}
        </MetricCard>
        <MetricCard
          icon={Tags}
          title="Last Release"
        >
          {releaseInfo.lastRelease}
        </MetricCard> */}

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
        <div className="text-xl font-semibold text-gray-600">
          Score: {healthStatus.health_score}
        </div>
      </div>
      <div className="ml-2 flex items-center flex-wrap gap-3 w-full">
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.readme
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          README
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.codeOfConduct
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          CODE OF CONDUCT
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.contributing
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          CONTRIBUTING
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.license
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          LICENSE
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.securityPolicy
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Security Policy
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.issueTemplates
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Issue Templates
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.prTemplates
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Pull Request Templates
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.contentReports
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Content Reports
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.description
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700")
          }
        >
          Description
        </div>
        <div
          className={
            "px-1 py-0.5 border rounded-lg" +
            " " +
            (healthStatus.documentation
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
          <h2 className="text-lg font-semibold text-gray-700">
            Contributions Distribution
          </h2>
          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={contributionStats}>
              <Tooltip cursor={{ fill: "#f3f4f6" }} />
              <XAxis
                dataKey="contributor"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
              <Bar
                dataKey="contributions"
                fill="#ccc"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Total Lines of Code */}
        <div className="grow-1 rounded-xl p-2 shadow-sm hover:shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Lines of Code Over Time
          </h2>
          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart data={codeFrequency}>
              <Tooltip cursor={{ stroke: "#9ca3af", strokeWidth: 1 }} />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />
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
