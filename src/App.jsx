import React from "react";
import "./App.css";
import Team from "./features/heroes/Team";
import Seeker from "./features/heroes/Seeker";
import Alerts from "./components/Alerts";

import { selectAlert } from "./features/heroes/heroSlice";
import { useSelector } from "react-redux";

function App() {
  const alert = useSelector(selectAlert);

  return (
    <>
      {alert?.show && <Alerts alert={alert} />}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <h1 className="mx-auto p-1">Hero Team Inspector</h1>
        </div>
      </nav>
      <Team />
      <Seeker />
    </>
  );
}

export default App;
