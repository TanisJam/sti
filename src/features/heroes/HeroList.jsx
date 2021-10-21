import React from "react";
import HeroCard from "./heroCard/HeroCard";

export default function HeroList({ heroes, type }) {
  
 
  return (
    <>
      {heroes.map((hero) => (
        <HeroCard hero={hero} key={hero.id} />
      ))}
    </>
  );
}
