import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchHeroes, selectSearchResults } from "../heroSlice";
import HeroList from "../HeroList";
import SearchForm from "./SearchForm";

export default function Seeker() {
  const heroesResults = useSelector(selectSearchResults);
  const status = useSelector((state) => state.heroes.status);
  const error = useSelector((state) => state.heroes.error);
  const dispatch = useDispatch();

  const handleSearch = (value) => {
    dispatch(searchHeroes(value));
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
        <SearchForm onSearch={handleSearch} />
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-1 col-md-8 mx-auto">
        {content}
      </div>
    </div>
  );
}
