import React from "react";
import "./App.css";
import Alerts from "./components/Alerts";
import Nav from "./components/Nav";
import Team from "./features/heroes/Team";
import HomeMsg from "./components/HomeMsg";
import Seeker from "./features/heroes/searchForm/Seeker";

import { selectAlert, selectTeamMembers } from "./features/heroes/heroSlice";
import { useSelector } from "react-redux";

function App() {
  const alert = useSelector(selectAlert);
  const team = useSelector(selectTeamMembers);

  return (
    <>
      {alert?.show && <Alerts alert={alert} />}
      <Nav />
      {team.length > 0 ? <Team /> : <HomeMsg />}
      <Seeker />
    </>
  );
}

export default App;
