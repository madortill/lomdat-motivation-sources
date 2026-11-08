import React, { useState } from "react";
import "./Practice.css";
import "./WrittenPractice.css";

import usePersistentState from "../../hooks/usePersistentState.js";

import practiceBackground from "../../../media/images/Practice/practice-background.svg";
import triangleLight from "../../../media/images/Practice/triangle-light.svg";

function WrittenPractice({ phase, onStart, onSubmit, onContinue }) {
  const [answer, setAnswer] = usePersistentState(
    "lomda-practice-written-answer",
    ""
  );

  const [submitted, setSubmitted] = usePersistentState(
    "lomda-practice-written-submitted",
    false
  );

  const [error, setError] = useState("");

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
    setError("");

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!answer.trim()) {
      setError("יש לכתוב תשובה לפני ההגשה.");
      return;
    }

    setSubmitted(true);
    setError("");
    onSubmit();
  };

  return (
    <div className="practice-page written-practice-page">
      <img
        className="practice-background"
        src={practiceBackground}
        alt=""
      />

      {phase === "intro" && (
        <>
          <div className="practice-intro-heading">
            <h1>התרגול</h1>
            <p>- לחצו על נורת האזהרה -</p>
          </div>

          <button
            type="button"
            className="written-warning-button"
            onClick={onStart}
            aria-label="פתיחת התרגול האחרון"
          >
            <img
              src={triangleLight}
              alt="מסגרת נורת האזהרה"
            />
          </button>
        </>
      )}

      {phase === "write" && (
        <form
          className="written-practice-board"
          onSubmit={handleSubmit}
        >
          <h1 className="written-practice-question">
            אתם מפקדים בטירונות כלל־צה״לית. במהלך שבוע
            המטווחים, אחד החיילים מספר לכם שהוא חושש מאוד
            מנשק ומבקש שלא להשתתף במטווח, למרות שעבר את
            ההכנות הנדרשות.
            <br />
            מצד אחד, עליכם לוודא שהחייל עומד בדרישות ההכשרה.
            מצד שני, חשוב לכם שירגיש בטוח ויצליח להתמודד
            עם החשש.
            <br />
            <br />
            באילו מקורות כוח והנעה תשתמשו כדי להתמודד עם
            המצב? הסבירו כיצד תשלבו ביניהם ומדוע.
          </h1>

          <label
            className="written-practice-label"
            htmlFor="written-practice-answer"
          >
            התשובה שלכם
          </label>

          <textarea
            id="written-practice-answer"
            className="written-practice-textarea"
            value={answer}
            onChange={handleAnswerChange}
            placeholder="כתבו כאן את התשובה שלכם..."
            rows={8}
            dir="rtl"
            autoComplete="off"
            aria-describedby={error ? "written-practice-error" : undefined}
          />

          {error && (
            <p
              id="written-practice-error"
              className="written-practice-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="written-practice-submit"
          >
            הגשה
          </button>
        </form>
      )}

      {phase === "complete" && (
        <div className="written-complete-overlay">
          <section className="written-complete-popup">
            <h2>
              אלופים! סיימתם את התרגול
              <br />
              התקדמו לחלק הבא בלומדה
            </h2>

            <button
              type="button"
              className="written-complete-button"
              onClick={onContinue}
            >
              <span aria-hidden="true">←</span>
              המשך
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default WrittenPractice;