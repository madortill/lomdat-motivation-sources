import React from "react";
import "./NavigationArrows.css";

import nextArrow from "../../../media/images/next-arrow.svg";
import backArrow from "../../../media/images/back-arrow.svg";

function NavigationArrows({ onNext, onBack }) {
  return (
    <div className="navigation-arrows">
      <button className="navigation-back" onClick={onBack} aria-label="חזרה">
        <img src={backArrow} alt="" />
      </button>
      <button className="navigation-next" onClick={onNext} aria-label="המשך">
        <img src={nextArrow} alt="" />
      </button>
    </div>
  );
}

export default NavigationArrows;