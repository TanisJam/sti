import React, { useState } from "react";
import HeroDetails from "./HeroDetails";
import { useDispatch } from "react-redux";
import { addHero, removeHero } from "../heroSlice";
import "./HeroCard.css";

export default function HeroCard({ hero, context, over }) {
  const [optionsVisivility, setOptionsVisivility] = useState(false);
  const [detailsVisivility, setDetailsVisivility] = useState(false);
  const dispatch = useDispatch();

  const borderStyle = hero.biography.alignment === "good";

  let buttons;
  if (context === "search") {
    buttons = (
      <div className="card-body d-grid gap-1">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={(e) => handleDetails(e)}
        >
          Details
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => dispatch(addHero(hero))}
        >
          Add
        </button>
      </div>
    );
  } else if (context === "team") {
    buttons = (
      <div className="card-body d-grid gap-1">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={(e) => handleDetails(e)}
        >
          Details
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => dispatch(removeHero(hero))}
        >
          Remove
        </button>
      </div>
    );
  }

  const handleDetails = () => {
    setDetailsVisivility(!detailsVisivility);
  };
  return (
    <>
      {detailsVisivility && (
        <HeroDetails
          close={() => setDetailsVisivility(false)}
          hero={hero}
          context={context}
        />
      )}
      <div
        className={`card ${borderStyle ? "good" : "bad"}`}
        style={{ maxWidth: "150px" }}
        onMouseOver={() => {
          setOptionsVisivility(true);
          if (over) over.in({ stats: hero.powerstats, name: hero.name });
        }}
        onMouseLeave={() => {
          setOptionsVisivility(false);
          if (over) over.out();
        }}
      >
        <img src={hero.image.url} className="card-img-top" alt="hero" />

        {optionsVisivility ? (
          buttons
        ) : (
          <h5 className="card-title">{hero.name}</h5>
        )}
      </div>
    </>
  );
}
