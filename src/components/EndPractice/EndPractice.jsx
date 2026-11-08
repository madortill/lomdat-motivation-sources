import React, { useEffect, useState } from "react";
import "./EndPractice.css";

import endPracticeBackground from "../../../media/images/practice-end-background.svg";
import redCar from "../../../media/images/FirstPage/first-red-car.svg";

const FIRST_TEXT =
  "זוכרים שבהתחלה ניסינו להתניע את הרכב, אבל הוא לא שיתף פעולה?";

const SECOND_TEXT =
  "עכשיו, אחרי שהכרנו את מקורות הכוח, הגיע הזמן לנסות שוב.";

const FULL_TEXT = `${FIRST_TEXT}\n\n${SECOND_TEXT}`;

const DRIVE_DURATION = 6000;
const TYPING_SPEED = 48;

function EndPractice({ onNext }) {
  const [driveFinished, setDriveFinished] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  const typingFinished = visibleCharacters >= FULL_TEXT.length;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDriveFinished(true);
    }, DRIVE_DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!driveFinished || typingFinished) return;

    const timer = window.setTimeout(() => {
      setVisibleCharacters((prev) =>
        Math.min(prev + 1, FULL_TEXT.length)
      );
    }, TYPING_SPEED);

    return () => window.clearTimeout(timer);
  }, [driveFinished, visibleCharacters, typingFinished]);

  const visibleText = FULL_TEXT.slice(0, visibleCharacters);

  return (
    <div className="end-practice">
      {/* הרקע הפנורמי */}
      <div className="end-practice-scene">
        <img
          className="end-practice-landscape"
          src={endPracticeBackground}
          alt=""
        />
      </div>

      {/* המכונית הנוסעת */}
      <div
        className={`end-practice-car ${
          driveFinished ? "end-practice-car-stopped" : ""
        }`}
      >
        <img src={redCar} alt="מכונית אדומה נוסעת בכביש" />
      </div>

      {/* חלונית הסיום מופיעה רק לאחר העצירה */}
      {driveFinished && (
        <div className="end-practice-overlay">
          <div className="end-practice-popup">
            <div className="end-practice-text">
              <p>
                {visibleText}
                {!typingFinished && (
                  <span
                    className="end-practice-cursor"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
              </p>
            </div>

            {typingFinished && (
              <button
                type="button"
                className="end-practice-button"
                onClick={() => onNext?.()}
              >
                <span
                  className="end-practice-arrow"
                  aria-hidden="true"
                >
                  ←
                </span>
                <span>מעבירים הילוך</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EndPractice;