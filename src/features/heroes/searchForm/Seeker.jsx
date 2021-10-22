import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchHeroes, selectSearchResults } from "../heroSlice";
import HeroList from "../HeroList";
import SearchForm from "./SearchForm";

export default function Seeker() {
  const heroesResults = useSelector(selectSearchResults);
  const status = useSelector((state) => state.heroes.status);
  const error = useSelector((state) => state.heroes.error);
  const dispatch = useDispatch();
  const [heroName, setHeroName] = useState("");

  const handleChange = (e) => {
    setHeroName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (heroName) {
      dispatch(searchHeroes(heroName));
      setHeroName("");
    }
  };

  let content;
  if (status === "loading") {
    content = (
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  } else if (status === "succeeded") {
    if (heroesResults.length > 0) {
      content = <HeroList heroes={heroesResults} context="search" />;
    }
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="container mb-5">
      <div className="form-group col-md-8 col-xl-6 mx-auto">
        <label className="form-label mt-4">Find heroes</label>
        <SearchForm />
        {/* <form className="form-floating mb-3 d-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Hero Name"
            aria-describedby="button-addon2"
            value={heroName}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            Search
          </button>
          <label htmlFor="floatingInput">Hero Name</label>
        </form> */}
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-1 col-md-8 mx-auto">
        {content}
      </div>
    </div>
  );
}
