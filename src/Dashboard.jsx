import { useState, useEffect } from "react";

import { githubCollector } from "./collector";

import { Loader } from "./Loader.jsx";
import { Title } from "./Title.jsx";
import { Health } from "./Health.jsx";
import { Pulse } from "./Pulse.jsx";
import { Trends } from "./Trends.jsx";

// Dashboard :)
const Dashboard = (props) => {
  const [stats, setStats] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await githubCollector.collectRepositoryData(
        props.owner,
        props.repo
      );
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
