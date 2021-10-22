import React from "react";
import HeroCard from "./heroCard/HeroCard";

export default function HeroList({ heroes, context, over }) {
  return (
    <>
      {heroes.map((hero) => (
        <HeroCard
          hero={hero}
          context={context}
          key={hero.id}
          onMouseOver={() => console.log('overing')}
          over={over}
        />
      ))}
    </>
  );
}
