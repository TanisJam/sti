import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectToken } from "../features/login/userSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectToken);
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(logOut());
    history.go(0);
  };

  return (
    <nav className="navbar navbar-dark bg-dark py-2">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <img src="/logo.png" alt="" width="30" height="30" className="me-2" />
          Superhero Team Inspector
        </span>
        {isLoggedIn && (
          <button
            className="btn btn-sm btn-outline-secondary"
            type="button"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}
