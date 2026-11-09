import React from "react";
import "./InfoPopup.css";

function InfoPopup({ title, onClose, children }) {
  return (
    <div className="info-popup-overlay">
      <div
        className="info-popup"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >

        <h2 className="info-popup-title">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default InfoPopup;