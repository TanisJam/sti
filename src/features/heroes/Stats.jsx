import React from "react";

export default function Stats({ stats, name = "TEAM" }) {
  let arrayStats = [];
  for (const key in stats) {
    let normalizedStat = stats[key];
    normalizedStat = normalizedStat !== "null" ? parseInt(normalizedStat) : 0;
    arrayStats.push({ stat: key, value: normalizedStat });
  }

  const arraySorted = arrayStats.sort(function (a, b) {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    return 0;
  });

  const styled = {
    power: "bg-danger text-white",
    speed: "bg-info",
    combat: "bg-warning",
    durability: "bg-dark text-white",
    intelligence: "bg-success",
    strength: "bg-primary",
  };

  const maxValue = Math.ceil(arraySorted[0].value / 100) * 100 + 0.1;

  return (
    <div className="py-4">
      <h2>{name}</h2>
      {arraySorted.map((stat, i) => (
        <div
          className="py-1"
          key={stat.stat}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`${stat.value}%`}
        >
          <div className="progress" style={{ height: "1rem" }}>
            <div
              className={`
              progress-bar
              progress-bar-animated
              text-dark
              ${i === 0 && "progress-bar-striped"}
              ${styled[stat.stat]}
               `}
              role="progressbar"
              style={{ width: `${(stat.value * 100) / maxValue}%` }}
              aria-valuenow={stats.value}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {stat.value}%
            </div>
          </div>
          <p className="text-uppercase fs-6">{stat.stat}</p>
        </div>
      ))}
    </div>
  );
}
