import React from "react";
import "./Practice.css";
import "./OilPractice.css";

import usePersistentState from "../../hooks/usePersistentState.js";

import practiceBackground from "../../../media/images/Practice/practice-background.svg";
import oilLight from "../../../media/images/Practice/oil-light.svg";
import heatLight from "../../../media/images/Practice/heat-light.svg";

const exercises = {
  oil: {
    title: "אילו יתרונות יש לשימוש ביחסי אנוש כמקור כוח? סמנו את כל התשובות הנכונות.",
    light: oilLight,
    statements: [
      {
        id: 1,
        text: "מעביר תחושת אחידות של חוקיות ועקביות. ההיפך משרירותיות",
        correct: true
      },
      {
        id: 2,
        text: "קרבת יתר תקשה על הצבת גבולות ודרישות גבוהות",
        correct: false
      },
      {
        id: 3,
        text: "מציב לחיילים רף התנהגותי ומסמן להם לאן לשאוף ולהתפתח",
        correct: true
      },
      {
        id: 4,
        text: "סמכות מוקנית אוטומטית מתוקף הדרגה",
        correct: false
      },
      {
        id: 5,
        text: "ניתנת לרכישה באמצעות למידה וניסיון",
        correct: true
      },
      {
        id: 6,
        text: "סמכות מוקנית אוטומטית מתוקף הדרגה",
        correct: false
      }
    ]
  },

  heat: {
    title: "מהו החיסרון של שימוש במקור הערכיות כמקור כוח?",
    light: heatLight,
    statements: [
      {
        id: 1,
        text: "אפקט מצטבר ולא מיידי – אמון והזדהות עם ערכיות המפקד הן חוויה מתפתחת אשר לוקחת זמן",
        correct: true
      },
      {
        id: 2,
        text: "קרבת יתר תקשה על הצבת גבולות ודרישות גבוהות",
        correct: false
      },
      {
        id: 3,
        text: "מציב לחיילים רף התנהגותי ומסמן להם לאן לשאוף ולהתפתח",
        correct: false
      },
      {
        id: 4,
        text: "סמכות מוקנית אוטומטית מתוקף הדרגה",
        correct: false
      }
    ]
  }
};

function OilPractice({
  exercise = "oil",
  phase,
  onStart,
  onContinue,
  onSolvedChange
}) {
  const config = exercises[exercise];

  const [selectedCards, setSelectedCards] = usePersistentState(
    `lomda-${exercise}-multiple-choice-selected-v2`,
    []
  );

  const [checked, setChecked] = usePersistentState(
    `lomda-${exercise}-multiple-choice-checked-v2`,
    false
  );

  const [message, setMessage] = usePersistentState(
    `lomda-${exercise}-multiple-choice-message-v2`,
    ""
  );

  const allCorrect = config.statements.every(
    (item) => selectedCards.includes(item.id) === item.correct
  );

  const canContinue = checked && allCorrect;

  const toggleCard = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );

    setChecked(false);
    setMessage("");
    onSolvedChange(false);
  };

  const checkAnswers = () => {
    setChecked(true);

    if (allCorrect) {
      setMessage("כל הכבוד! כל התשובות נכונות.");
      onSolvedChange(true);
    } else {
      setMessage(
        "יש תשובות שדורשות תיקון. שנו את הסימונים והגישו שוב."
      );
      onSolvedChange(false);
    }
  };

  const getCardStatus = (item) => {
    if (!checked) return "";

    const selected = selectedCards.includes(item.id);

    if (item.correct && selected) return "correct";
    if (!item.correct && selected) return "incorrect";
    if (item.correct && !selected) return "missed";

    return "";
  };

  return (
    <div className="practice-page">
      <img
        className="practice-background"
        src={practiceBackground}
        alt=""
      />

      {phase === "intro" && (
        <>
          <div className="practice-intro-heading">
            <h1>תרגול</h1>
            <p>לחצו על הנורה המהבהבת</p>
          </div>

          <button
            type="button"
            className={`practice-warning-button practice-warning-${exercise}`}
            onClick={onStart}
            aria-label="לחצו על הנורה כדי להתחיל בתרגול"
          >
            <img
              src={config.light}
              alt="נורת אזהרה מהבהבת"
            />
          </button>
        </>
      )}

      {phase === "sort" && (
        <section className="oil-practice-board">
          <h1 className="oil-practice-title">
            {config.title}
          </h1>

          <div
            className={`oil-practice-grid ${
              exercise === "heat" ? "heat-practice-grid" : ""
            }`}
          >
            {config.statements.map((item) => {
              const selected = selectedCards.includes(item.id);
              const status = getCardStatus(item);

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`oil-practice-card ${
                    selected ? "selected" : ""
                  } ${status}`}
                  onClick={() => toggleCard(item.id)}
                  aria-pressed={selected}
                >
                  <span>{item.text}</span>

                  {checked && status && (
                    <span
                      className="oil-practice-status"
                      aria-hidden="true"
                    >
                      {status === "correct" ? "✓" : "✕"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="oil-practice-bottom">
            <p
              className={`oil-practice-message ${
                canContinue ? "success" : ""
              }`}
              role="status"
            >
              {message}
            </p>

            {canContinue ? (
              <button
                type="button"
                className="oil-practice-submit"
                onClick={onContinue}
              >
                המשך
              </button>
            ) : (
              <button
                type="button"
                className="oil-practice-submit"
                onClick={checkAnswers}
              >
                הגשה
              </button>
            )}
          </div>
        </section>
      )}

      {phase === "complete" && (
        <section className="practice-complete-screen">
          <h1>כל הכבוד!</h1>
          <p>השלמתם בהצלחה את התרגולים.</p>
        </section>
      )}
    </div>
  );
}

export default OilPractice;