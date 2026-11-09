import React, { useEffect, useState } from "react";
import "./EndPractice.css";

import background from "../../../media/images/end-practice-background.svg";
import redCar from "../../../media/images/FirstPage/first-red-car.svg";
import buttonArrow from "../../../media/images/button-arrow.svg";

const EXPLANATION_TEXT =
  "אז הכרנו את מקורות הכוח וההנעה, אבל איך משתמשים בהם בשטח?\n\n" +
  "בדיוק כמו בנהיגה, גם בפיקוד אין הילוך אחד שמתאים לכל מצב! על המפקד לדעת לשלב בין מקורות הכוח וההנעה ולהתאים את דרך ההנעה למאפייני החיל ולמשימה.";

const QUESTION_TEXT =
  "על פי איזה מקור כוח והנעה תרצה לפעול בתור מפקד?";

const TYPING_SPEED = 45;
const READING_DELAY = 1800;

function EndPractice({
  phase = "finished",
  onDrive,
  onDriveFinished,
  onExplanationFinished,
  onNext,
  onRestart,
  onBack
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  const isIntro = phase === "finished";
  const isDriving = phase === "driving";
  const isExplanation = phase === "reflection";
  const isQuestion = phase === "question";
  const isEnding = phase === "ending";

  const activeText = isExplanation
    ? EXPLANATION_TEXT
    : isQuestion
      ? QUESTION_TEXT
      : "";

  const typingFinished =
    activeText.length > 0 &&
    visibleCharacters >= activeText.length;

  useEffect(() => {
    if (!isExplanation && !isQuestion) return;

    setVisibleCharacters(0);

    let count = 0;

    const interval = window.setInterval(() => {
      count += 1;

      setVisibleCharacters(count);

      if (count >= activeText.length) {
        window.clearInterval(interval);
      }
    }, TYPING_SPEED);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (!isExplanation || !typingFinished) return;

    const timeout = window.setTimeout(() => {
      onExplanationFinished?.();
    }, READING_DELAY);

    return () => window.clearTimeout(timeout);
  }, [isExplanation, typingFinished, onExplanationFinished]);

  const handleDriveEnd = (event) => {
    if (event.animationName === "endPracticeCarDrive") {
      onDriveFinished?.();
    }
  };

  return (
    <div className="end-practice">

      {/* מסך המעבר לפני הנסיעה */}
      {isIntro && (
        <>
          <img
            className="end-practice-intro-background"
            src={background}
            alt=""
          />

          <div className="end-practice-intro-overlay" />

          <div className="end-practice-popup">
            <div className="end-practice-intro-text">
              <p>
                זוכרים שבהתחלה ניסינו
                להתניע את הרכב, אבל הוא לא
                שיתף פעולה?
              </p>

              <p>
                עכשיו, אחרי שהכרנו את
                מקורות הכוח, הגיע הזמן לנסות
                שוב.
              </p>
            </div>

            <button
              type="button"
              className="end-practice-button"
              onClick={onDrive}
            >
              <span>מעבירים הילוך</span>
              <img src={buttonArrow} alt="" />
            </button>
          </div>
        </>
      )}

      {/* אנימציית הנסיעה */}
      {isDriving && (
        <>
          <div className="end-practice-scene">
            <img
              className="end-practice-landscape driving"
              src={background}
              alt=""
            />
          </div>

          <div
            className="end-practice-car"
            onAnimationEnd={handleDriveEnd}
          >
            <img
              src={redCar}
              alt="מכונית אדומה נוסעת ימינה"
            />
          </div>
        </>
      )}

      {/* המסכים שאחרי הנסיעה */}
      {(isExplanation || isQuestion || isEnding) && (
        <>
          <div className="end-practice-scene">
            <img
              className="end-practice-landscape final-position"
              src={background}
              alt=""
            />
          </div>

          {/* מסך ראשון - הסבר מוקלד */}
          {isExplanation && (
            <div className="end-practice-content">
              <p className="end-practice-explanation">
                {EXPLANATION_TEXT.slice(
                  0,
                  visibleCharacters
                )}

                {!typingFinished && (
                  <span className="end-practice-cursor">
                    |
                  </span>
                )}
              </p>
            </div>
          )}

          {/* מסך שני - שאלת הסיכום */}
          {isQuestion && (
            <div className="end-practice-content">
              <p className="end-practice-explanation">
                {EXPLANATION_TEXT}
              </p>

              <div className="end-practice-question-area">
                <h2 className="end-practice-question">
                  {QUESTION_TEXT.slice(
                    0,
                    visibleCharacters
                  )}

                  {!typingFinished && (
                    <span className="end-practice-cursor">
                      |
                    </span>
                  )}
                </h2>

                {typingFinished && (
                  <button
                    type="button"
                    className="end-practice-button"
                    onClick={onNext}
                  >
                    <span>המשך</span>
                    <img src={buttonArrow} alt="" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* מסך סיום הלומדה */}
          {isEnding && (
            <div className="end-practice-content end-practice-ending">
              <h1>
                כל הכבוד!
                <br />
                סיימתם את לומדת
                <br />
                מקורות הכוח
                <br />
                וההנעה
              </h1>

              <button
                type="button"
                className="end-practice-button end-practice-restart-button"
                onClick={onRestart}
              >
                <span>חזרה ללומדה</span>
                <img src={buttonArrow} alt="" />
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default EndPractice;