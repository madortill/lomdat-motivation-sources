import React from "react";
import "./App.css";

import mglLogo from "../media/images/logos/mgl-logo.svg";
import tillLogo from "../media/images/logos/till-logo.svg";
import tohadLogo from "../media/images/logos/tohad-logo.svg";

import FirstPage from "./components/FirstPage/FirstPage.jsx";

function App() {
  return (
    <div className="app">
      <img className="mgl-logo" src={mglLogo} alt="mgl-logo" />
      <img className="till-logo" src={tillLogo} alt="till-logo" />
      <img className="tohad-logo" src={tohadLogo} alt="tohad-logo" />

  <FirstPage />


    </div>
  );
}

export default App;