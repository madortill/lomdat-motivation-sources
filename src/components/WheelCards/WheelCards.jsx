import React, { useRef } from "react";
import "./WheelCards.css";

function WheelCards({
  cards,
  onVisit,
  category,
  activeIndex = 0,
  disabled = false
}) {
  const dragStart = useRef(null);
  const preventClick = useRef(false);

  const goToCard = (index) => {
    if (
      disabled ||
      index < 0 ||
      index >= cards.length ||
      index === activeIndex
    ) {
      return;
    }

    onVisit(category, index);
  };

  const handlePointerDown = (event) => {
    if (disabled) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event) => {
    if (!dragStart.current) return;
    if (dragStart.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragStart.current.x;
    const deltaY = event.clientY - dragStart.current.y;

    dragStart.current = null;

    if (
      Math.abs(deltaX) > 40 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2
    ) {
      preventClick.current = true;

      if (deltaX < 0) {
        goToCard(activeIndex + 1);
      } else {
        goToCard(activeIndex - 1);
      }
    }
  };

  const handlePointerCancel = () => {
    dragStart.current = null;
  };

  const handleCardClick = (event, index) => {
    if (preventClick.current) {
      event.preventDefault();
      preventClick.current = false;
      return;
    }

    goToCard(index);
  };

  return (
    <div className={`wheel-cards ${disabled ? "wheel-cards-disabled" : ""}`}>
      <div
        className="wheel-cards-display"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {cards.map((card, index) => {
          const offset = activeIndex - index;
          const isActive = index === activeIndex;

          return (
            <button
              key={`${category}-${index}`}
              type="button"
              className={`wheel-card ${
                isActive ? "wheel-card-active" : "wheel-card-inactive"
              }`}
              style={{
                "--card-offset": offset,
                zIndex: isActive ? 2 : 1
              }}
              onClick={(event) => handleCardClick(event, index)}
              disabled={disabled}
              aria-label={`כרטיסייה ${index + 1}`}
              aria-current={isActive ? "step" : undefined}
              tabIndex={
                !disabled && (isActive || Math.abs(offset) === 1)
                  ? 0
                  : -1
              }
            >
              <p>{card}</p>
            </button>
          );
        })}
      </div>

      {!disabled && (
        <div className="wheel-card-controls">
          <div className="wheel-card-dots">
            {cards.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`wheel-card-dot ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => goToCard(index)}
                aria-label={`כרטיסייה ${index + 1}`}
                aria-current={activeIndex === index ? "step" : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WheelCards;