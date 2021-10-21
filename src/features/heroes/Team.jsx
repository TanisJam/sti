import React from "react";
// import HeroCard from "./heroCard/HeroCard";
import Stats from "./Stats";
import HeroList from "./HeroList";
import { useSelector } from "react-redux";
import { selectTeamMembers } from "./heroSlice";

const stats = {
  intelligence: 88,
  strength: 48,
  speed: 100,
  durability: 60,
  power: 100,
  combat: 60,
};

export default function Team() {
  const heroes = useSelector(selectTeamMembers);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6" style={{ maxWidth: "550px" }}>
          <div className="d-flex flex-wrap justify-content-center gap-1">
            <HeroList heroes={heroes} />
          </div>
        </div>
        <div className="col-md-6 my-auto">
          <Stats stats={stats} />
        </div>
      </div>
    </div>
  );
}
