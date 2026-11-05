import React, { useState } from "react";
import "./App.css";

import mglLogo from "../media/images/logos/mgl-logo.svg";
import tillLogo from "../media/images/logos/till-logo.svg";
import tohadLogo from "../media/images/logos/tohad-logo.svg";

import FirstPage from "./components/FirstPage/FirstPage.jsx";
import OpenedDrawer from "./components/OpenedDrawer/OpenedDrawer.jsx";
import InfoPages from "./components/InfoPages/InfoPages.jsx";
import NavigationArrows from "./components/NavigationArrows/NavigationArrows.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [infoStep, setInfoStep] = useState(0);
  const [visitedTabs, setVisitedTabs] = useState([]);
  const [batteryCompleted, setBatteryCompleted] = useState(false);

  const pages = ["first", "drawer", "info"];

  const hasVisitedBothTabs = visitedTabs.includes(2) && visitedTabs.includes(3);

  const openBattery = () => {
    setVisitedTabs([]);
    setInfoStep(1);
  };

  const closeInfoPopup = () => {
    setInfoStep(0);
  };

  const changeInfoTab = (step) => {
    setVisitedTabs((prev) => [...new Set([...prev, step])]);
    setInfoStep(step);
  };

  const nextPage = () => {
    if (pages[currentPage] === "info") {
      if (infoStep === 0) {
        return;
      }
      if (infoStep === 1) {
        changeInfoTab(2);
        return;
      }
      if (infoStep === 2) {
        changeInfoTab(3);
        return;
      }
      if (infoStep === 3 && hasVisitedBothTabs) {
        setBatteryCompleted(true);
        setInfoStep(0);
        return;
      }
      if (infoStep === 3 && !hasVisitedBothTabs) {
        changeInfoTab(2);
        return;
      }
    }
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

  const previousPage = () => {
    if (pages[currentPage] === "info" && infoStep > 0) {
      if (infoStep === 3) {
        changeInfoTab(2);
      } else {
        setInfoStep((prev) => prev - 1);
      }
      return;
    }
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="app">
      <img className="mgl-logo" src={mglLogo} alt="mgl-logo" />
      <img className="till-logo" src={tillLogo} alt="till-logo" />
      <img className="tohad-logo" src={tohadLogo} alt="tohad-logo" />

      {pages[currentPage] === "first" && (
        <FirstPage onNext={nextPage} />
      )}

      {pages[currentPage] === "drawer" && (
        <OpenedDrawer />
      )}

      {pages[currentPage] === "info" && (
        <InfoPages
          infoStep={infoStep}
          openBattery={openBattery}
          closeInfoPopup={closeInfoPopup}
          changeInfoTab={changeInfoTab}
          batteryCompleted={batteryCompleted}
        />
      )}

      {currentPage > 0 && (
        <NavigationArrows
          onBack={previousPage}
          onNext={nextPage}
        />
      )}
    </div>
  );
}

export default App;