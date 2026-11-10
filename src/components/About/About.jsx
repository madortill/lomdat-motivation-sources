import React, { useEffect, useRef, useState } from "react";
import "./About.css";

import aboutIcon from "../../../media/images/about.svg";
import character from "../../../media/images/character.svg";

function About() {
  const [isOpen, setIsOpen] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="lomda-about" ref={aboutRef}>
      <button
        type="button"
        className="lomda-about-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="אודות הלומדה"
        aria-expanded={isOpen}
      >
        <img src={aboutIcon} alt="" draggable={false} />
      </button>

      {isOpen && (
        <div
          className="lomda-about-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby="lomda-about-title"
        >
          <button
            type="button"
            className="lomda-about-close"
            onClick={() => setIsOpen(false)}
            aria-label="סגירת אודות"
          >
            ×
          </button>
      
          <h2 id="lomda-about-title">אודות </h2>

          <img
            className="lomda-about-character"
            src={character}
            alt=""
            draggable={false}
          />

          <h3>פיתוח וגרפיקה</h3>
          <p>טוראי גל גבעון</p>

          <h3>מומחי תוכן</h3>
          <p>סרן רוני שגב</p>
          <p>סגן שירה סולונג בן שושן  </p>

          <h3> רמ"ד טיל</h3>
          <p>  סמ"ר קטיה מדבדב</p>

          <h3>גרסה</h3>
          <p>נובמבר 2026</p>

          <p>סיווג: בלמ״ס</p>
          <p className="lomda-about-department">מדור טי״ל קריית ההדרכה</p>
        </div>
      )}
    </div>
  );
}

export default About;