import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export const Trends = ({ contributionDistribution, topContributors, codeFrequency }) => {
  const windows = ["3m", "6m", "1y"];
  const [window, setWindow] = useState("3m");
  codeFrequency = codeFrequency[window];

  return (
    <div className="flex flex-col justify-between items-center w-full gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="text-2xl font-bold">Trends</div>
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
         {/* Additions and Deletions */}
          <div className="grow rounded-xl p-2 shadow-sm hover:shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Code Frequency</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={codeFrequency}>
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <Bar dataKey="additions" fill="#22c55e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="deletions" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </div>
      <div className="ml-2 flex items-center flex-wrap gap-3 w-full">
          {/* Contributions Histogram */}
          <div className="grow rounded-xl p-2 shadow-sm hover:shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Contributions Distribution</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={contributionDistribution}>
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis dataKey="count" allowDecimals={false} tick={{ fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <Bar dataKey="count" fill="#ccc" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Contributors */}
          <div className="grow rounded-xl p-2 shadow-sm hover:shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Top 10 Contributors</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topContributors} layout="vertical">
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="contributor" tick={{ fontSize: 12 }} width={80} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <Bar dataKey="contributions" fill="#ccc" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

      </div>
    </div>
  );
};