import React, { useState } from "react";
import HeroDetails from "./HeroDetails";
import { useDispatch } from "react-redux";
import { addHero } from "../heroSlice";
import "./HeroCard.css";

export default function HeroCard({ hero }) {
  const [optionsVisivility, setOptionsVisivility] = useState(false);
  const [detailsVisivility, setDetailsVisivility] = useState(false);
  const dispatch = useDispatch();

  const handleDetails = () => {
    setDetailsVisivility(!detailsVisivility);
  };
  return (
    <>
      {detailsVisivility && (
        <HeroDetails
          close={() => setDetailsVisivility(false)}
          hero={hero}
          type="search"
        />
      )}
      <div
        className="card"
        style={{ maxWidth: "150px" }}
        onMouseOver={() => setOptionsVisivility(true)}
        onMouseLeave={() => setOptionsVisivility(false)}
      >
        <img src={hero.image.url} className="card-img-top" alt="hero" />

        {optionsVisivility ? (
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
        ) : (
          <h5 className="card-title">{hero.name}</h5>
        )}
      </div>
    </>
  );
}
