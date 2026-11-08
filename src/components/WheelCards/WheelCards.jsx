import React from "react";
import "./WheelCards.css";

import rightWheel from "../../../media/images/infoPages/right-wheel-icon.svg";
import leftWheel from "../../../media/images/infoPages/left-wheel.svg";

function WheelCards({
  cards,
  onVisit,
  category,
  activeIndex = 0,
  disabled = false
}) {
  const goToCard = (index) => {
    if (disabled || index < 0 || index >= cards.length || index === activeIndex) {
      return;
    }

    onVisit(category, index);
  };

  return (
    <div className={`wheel-cards ${disabled ? "wheel-cards-disabled" : ""}`}>
      <div className="wheel-cards-display">
        {cards.map((card, index) => {
          const offset = activeIndex - index;
          const isActive = index === activeIndex;

          return (
            <button
              key={`${category}-${index}`}
              type="button"
              className={`wheel-card ${isActive ? "wheel-card-active" : "wheel-card-inactive"}`}
              style={{
                "--card-offset": offset,
                zIndex: isActive ? 2 : 1
              }}
              onClick={() => goToCard(index)}
              disabled={disabled}
              aria-label={`כרטיסייה ${index + 1}`}
              aria-current={isActive ? "step" : undefined}
              tabIndex={!disabled && (isActive || Math.abs(offset) === 1) ? 0 : -1}
            >
              <p>{card}</p>
            </button>
          );
        })}
      </div>

      {!disabled && (
        <div className="wheel-card-controls">
          <button
            type="button"
            className="wheel-control"
            onClick={() => goToCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="כרטיסייה קודמת"
          >
            <img src={leftWheel} alt="" />
          </button>

          <div className="wheel-card-dots">
            {cards.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`wheel-card-dot ${activeIndex === index ? "active" : ""}`}
                onClick={() => goToCard(index)}
                aria-label={`כרטיסייה ${index + 1}`}
                aria-current={activeIndex === index ? "step" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className="wheel-control"
            onClick={() => goToCard(activeIndex + 1)}
            disabled={activeIndex === cards.length - 1}
            aria-label="כרטיסייה הבאה"
          >
            <img src={rightWheel} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

export default WheelCards;