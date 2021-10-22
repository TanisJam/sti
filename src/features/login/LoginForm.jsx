import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectToken } from "./userSlice";
import { Redirect } from "react-router-dom";

import Login from "./Login";

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectToken);

  const handleLogin = (data) => {
    dispatch(logIn(data));
  };

  const component = !isLoggedIn ? (
    <Login onLogin={handleLogin} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  );

  return component;
}
