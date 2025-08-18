
export const Health = ({ healthStatus }) => {
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
