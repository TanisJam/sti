import React from "react";

export default function Stats({stats}) {


  let statBars = [];
  for (const key in stats) {
    statBars.push(
      <div
        className="py-1"
        key={key}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={`${stats[key]}%`}
      >
        <div className="progress" style={{ height: "1rem" }}>
          <div
            className="progress-bar bg-warning text-dark"
            role="progressbar"
            style={{ width: `${stats[key]}%` }}
            aria-valuenow={stats[key]}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {stats[key]}%
          </div>
        </div>
        <p className="text-uppercase fs-6">{key}</p>
      </div>
    );
  }

  return <div className="py-4">{statBars.map((stat) => stat)}</div>;
}
