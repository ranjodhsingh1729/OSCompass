export const Title = (props) => {
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
        <div className="text-center flex flex-col justify-center items-center">
          <div className="text-xs text-gray-600">Last<br/>Release</div>
          <div className="text-xl font-bold">{props.releaseInfo.lastRelease || "N/A"}</div>
        </div>
        <div className="text-center flex flex-col justify-center items-center">
          <div className="text-xs text-gray-600">Release<br/>Frequency</div>
          <div className="text-xl font-bold">{props.releaseInfo.frequency || "N/A"}</div>
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