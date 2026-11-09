import React, { useState } from "react";
import "./WrittenPractice.css";

import usePersistentState from "../../hooks/usePersistentState.js";

import practiceBackground from "../../../media/images/Practice/practice-background.svg";
import triangleLight from "../../../media/images/Practice/triangle-light.svg";
import buttonArrow from "../../../media/images/button-arrow.svg";

function WrittenPractice({
  phase = "intro",
  onStart,
  onSubmit,
  onContinue
}) {
  const [answer, setAnswer] = usePersistentState(
    "lomda-practice-written-answer",
    ""
  );

  const [error, setError] = useState("");

  const isIntro = phase === "intro";
  const isWriting = phase === "write";
  const isComplete = phase === "complete";

  const handleSubmit = () => {
    if (!answer.trim()) {
      setError("יש לכתוב תשובה לפני ההגשה.");
      return;
    }

    setError("");
    onSubmit?.();
  };

  return (
    <div className="written-practice-page">
      <img
        className="written-practice-background"
        src={practiceBackground}
        alt=""
      />

      {isIntro && (
        <>
          <div className="written-practice-heading">
            <h1>תרגול</h1>
            <p>- לחצו על נורת האזהרה -</p>
          </div>

          <button
            type="button"
            className="written-practice-triangle-button"
            onClick={onStart}
            aria-label="פתיחת התרגול"
          >
            <img src={triangleLight} alt="" />
          </button>
        </>
      )}

      {isWriting && (
        <div className="written-practice-board">
          <h1>תרגול</h1>

          <p className="written-practice-text">
            אתם מפקדים בטירונות כל״צ. במהלך הטירונות, אחד החיילים מסרב להיכנס לתורנות מטבח בטענה שהתורנות אינה חלק מתפקידו ושהוא אינו מוכן לבצע אותה.
          </p>

          <p className="written-practice-text">
            מצד אחד, עליכם לוודא שהחייל ממלא את חובותיו ועומד בדרישות המסגרת. מצד שני, חשוב לכם להבין את הסיבה לסירוב ולמצוא דרך להניע אותו לשתף פעולה.
          </p>

          <p className="written-practice-text written-practice-question">
            באילו מקורות כוח והנעה תשתמשו כדי
            להתמודד עם המקרה? הסבירו כיצד תשלבו
            ביניהם ומדוע.
          </p>

          <div className="written-practice-answer-box">
            <textarea
              className="written-practice-textarea"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
                setError("");
              }}
              placeholder="כתבו את תשובתכם כאן..."
              dir="rtl"
              aria-label="כתיבת התשובה לתרגול"
              style={{ fontSize: "max(3.7cqw, 16px)" }}
            />
          </div>

          {error && (
            <p className="written-practice-error">
              {error}
            </p>
          )}

          <button
            type="button"
            className="written-practice-submit-button"
            onClick={handleSubmit}
          >
            הגשה
          </button>
        </div>
      )}

      {isComplete && (
        <div className="written-complete-overlay">
          <div className="written-complete-popup">
            <h2>
              אלופים! סיימתם את
              <br />
              התרגול
              <br />
              התקדמו לחלק הבא
              <br />
              בלומדה
            </h2>

            <button
              type="button"
              className="written-complete-button"
              onClick={onContinue}
            >
              <img src={buttonArrow} alt="" />
              <span>המשך</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WrittenPractice;