import React, { useState } from "react";
import Stats from "./Stats";
import HeroList from "./HeroList";
import { useSelector } from "react-redux";
import { selectTeamMembers, selectTeamStats } from "./heroSlice";
import { averageWeightAndHeight } from "../helpers/average";

export default function Team() {
  const heroes = useSelector(selectTeamMembers);
  const average = averageWeightAndHeight(heroes);
  const stats = useSelector(selectTeamStats);
  const [showStats, setShowStats] = useState("");
  const handleOver = {
    in: (stat) => {
      setShowStats(stat);
    },
    out: () => {
      setShowStats("");
    },
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6" style={{ maxWidth: "550px" }}>
          <div className="d-flex flex-wrap justify-content-center gap-1">
            <HeroList heroes={heroes} context="team" over={handleOver} />
          </div>
        </div>
        <div className="col-md-6 my-auto">
          {!showStats ? (
            <Stats stats={stats} />
          ) : (
            <Stats stats={showStats.stats} name={showStats.name} />
          )}
          <div className="d-flex flex-row text-center flex-wrap">
            <p className="text-white mx-auto bg-secondary px-4 py-2">
              Average weight:{" "}
              <span className="text-bolder font-monospace">
                {average.weight}kg
              </span>
            </p>
            <p className="text-white mx-auto bg-primary px-4 py-2">
              Average height:{" "}
              <span className="text-bolder font-monospace">
                {average.height}cm
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
