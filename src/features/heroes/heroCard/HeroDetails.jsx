import React from "react";
import { useDispatch } from "react-redux";
import { addHero, removeHero } from "../heroSlice";
import "./HeroDetails.css";

export default function HeroDetails({ close, hero, context }) {
  const dispatch = useDispatch();

  let footer;
  if (context === "search") {
    footer = (
      <button
        type="button"
        className="btn btn-success mx-auto"
        onClick={() => dispatch(addHero(hero))}
      >
        Add
      </button>
    );
  } else if (context === "team") {
    footer = (
      <button
        type="button"
        className="btn btn-danger mx-auto"
        onClick={() => dispatch(removeHero(hero))}
      >
        Remove
      </button>
    );
  }
  return (
    <>
      <div className="overlay"></div>
      <div className="modal-dialog modal-fullscreen-sm-down hero-details">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{hero.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={close}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-sm-6">
                <img src={hero.image.url} className="card-img-top" alt="hero" />
              </div>
              <div className="col-sm-6">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th>Weigth</th>
                      <td>{hero.appearance.weight[1]}</td>
                    </tr>
                    <tr>
                      <th>Height</th>
                      <td>{hero.appearance.height[1]}</td>
                    </tr>
                    <tr>
                      <th>Full name</th>
                      <td>{hero.biography["full-name"]}</td>
                    </tr>
                    <tr>
                      <th>Aliases</th>
                      <td>{hero.biography.aliases.join(" - ")}</td>
                    </tr>
                    <tr>
                      <th>Eye color</th>
                      <td>{hero.appearance["eye-color"]}</td>
                    </tr>
                    <tr>
                      <th>Hair color</th>
                      <td>{hero.appearance["hair-color"]}</td>
                    </tr>
                    <tr>
                      <th>Workplace</th>
                      <td>{hero.work.base}</td>
                    </tr>
                    <tr>
                      <th>Alignment</th>
                      <td>{hero.biography.alignment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {footer}
            {/* <button type="button" className="btn btn-primary">
              Add to team
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
