import React, { useState } from "react";
import "./GoCards.css";

function GoCards({ icon, previewTitle, revealedTitle }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  return (
    <button
      type="button"
      className={`go-card ${isRevealed ? "go-card-revealed" : ""}`}
      onClick={handleClick}
      aria-expanded={isRevealed}
      aria-label={isRevealed ? revealedTitle : `חשיפת ${previewTitle}`}
    >
      <div className="go-card-icon">
        <img src={icon} alt="" />
      </div>

      <span className="go-card-preview">{previewTitle}</span>
      <span className="go-card-revealed-text">{revealedTitle}</span>
    </button>
  );
}

export default GoCards;