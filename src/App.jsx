import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Alerts from "./components/Alerts";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./features/login/LoginForm";
import Team from "./features/heroes/Team";
import HomeMsg from "./components/HomeMsg";
import Seeker from "./features/heroes/searchForm/Seeker";

import { selectAlert, selectTeamMembers } from "./features/heroes/heroSlice";
import { useSelector } from "react-redux";

function App() {
  const alert = useSelector(selectAlert);
  const team = useSelector(selectTeamMembers);

  return (
    <Router>
      {alert?.show && <Alerts alert={alert} />}
      <Nav />
      <Switch>
        <Route path="/login" component={LoginForm} />

        <PrivateRoute path="/">
          {team.length > 0 ? <Team /> : <HomeMsg />}
          <Seeker />
        </PrivateRoute>

        {/* <Route path="/" render={() => <></>} /> */}
      </Switch>
    </Router>
  );
}

export default App;
