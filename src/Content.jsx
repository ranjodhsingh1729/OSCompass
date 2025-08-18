import { useState } from "react";

import Landing from "./Landing.jsx";
import Dashboard from "./Dashboard.jsx";

function Content(props) {
  let [owner, setOwner] = useState("");
  let [repo, setRepo] = useState("");
  let [page, setPage] = useState("Landing");

  const letsGo = (owner, repo) => {
    setOwner(owner);
    setRepo(repo);
    setPage("Dashboard");
  }

  return (
    <div className="grow p-3 flex flex-col justify-center items-center">
      {page == "Landing" && <Landing callback={letsGo} />}
      {page == "Dashboard" && <Dashboard owner={owner} repo={repo} />}
    </div>
  );
}

export default Content;
