import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../features/login/userSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(logOut());
    history.go(0);
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-fex flex-row">
        <h1 className="mx-auto p-4">Superhero Team Inspector</h1>
        <button className="btn btn-primary" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </nav>
  );
}
