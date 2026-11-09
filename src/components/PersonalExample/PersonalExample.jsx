import React, { useState } from "react";
import "./PersonalExample.css";

import GoCards from "../GoCards/GoCards.jsx";
import bubbleIcon from "../../../media/images/infoPages/bubble-icon.svg";
import spinningWheelIcon from "../../../media/images/infoPages/spinning-wheel-icon.svg";

const ADVANTAGES_STORAGE_KEY = "lomda-personal-example-visited-advantages";
const DISADVANTAGES_STORAGE_KEY = "lomda-personal-example-visited-disadvantages";

function readVisitedCards(storageKey) {
  try {
    const stored = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );

    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function PersonalExample({ infoStep }) {
  const showAdvantages = infoStep === 5;
  const showDisadvantages = infoStep === 6;

  const [visitedAdvantages, setVisitedAdvantages] = useState(() =>
    readVisitedCards(ADVANTAGES_STORAGE_KEY)
  );

  const [visitedDisadvantages, setVisitedDisadvantages] = useState(() =>
    readVisitedCards(DISADVANTAGES_STORAGE_KEY)
  );

  const personalExamples = [
    "חתירה למצוינות",
    "נראות המפקד-ייצוגיות",
    "הראשון לקום האחרון לישון",
    "שימוש בשפה נאותה"
  ];

  const advantages = [
    {
      previewTitle: "יתרון 1",
      revealedTitle: "הנעת אנשים במצבי לחץ וחירום"
    },
    {
      previewTitle: "יתרון 2",
      revealedTitle: "מייצר הערכה טבעית של החיילים והמפקדים כלפי המפקד"
    },
    {
      previewTitle: "יתרון 3",
      revealedTitle: "יצירת מורל וגאווה"
    }
  ];

  const disadvantages = [
    {
      previewTitle: "חיסרון 1",
      revealedTitle: "המפקד נדרש לעסוק ולחשוב כיצד הוא מצטייר בעיני חייליו כל הזמן"
    },
    {
      previewTitle: "חיסרון 2",
      revealedTitle: "עומס רב - דרישות וסטנדרט 24/7"
    }
  ];

  const handleAdvantageReveal = (index) => {
    setVisitedAdvantages((prev) => {
      if (prev.includes(index)) return prev;

      const updated = [...prev, index];

      localStorage.setItem(
        ADVANTAGES_STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const handleDisadvantageReveal = (index) => {
    setVisitedDisadvantages((prev) => {
      if (prev.includes(index)) return prev;

      const updated = [...prev, index];

      localStorage.setItem(
        DISADVANTAGES_STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const allAdvantagesVisited = advantages.every(
    (_, index) => visitedAdvantages.includes(index)
  );

  const allDisadvantagesVisited = disadvantages.every(
    (_, index) => visitedDisadvantages.includes(index)
  );

  return (
    <>
      {infoStep === 4 && (
        <div className="personal-example-content">
          <p className="personal-example-definition">
            כוח זה נובע מיכולתו של המפקד להשפיע על פקודיו
            מתוקף ״דמות המפקד״ אותה רואים הפקודים
            כשאיפה להידמות ולהנהיג בדרכו.
          </p>

          <div className="personal-bubbles">
            {personalExamples.map((example, index) => (
              <div
                className={`personal-bubble personal-bubble-${index + 1}`}
                key={index}
              >
                <img src={bubbleIcon} alt="" />
                <span>{example}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(showAdvantages || showDisadvantages) && (
        <div className="personal-cards-content">
          <h3 className="personal-cards-instruction">
            {showAdvantages
              ? "- לחצו על ההיגדים בשביל ללמוד על היתרונות -"
              : "- לחצו על ההיגדים בשביל ללמוד על החסרונות -"}
          </h3>

          <div className="personal-cards-list">
            {(showAdvantages ? advantages : disadvantages).map(
              (item, index) => (
                <GoCards
                  key={`${infoStep}-${index}`}
                  icon={spinningWheelIcon}
                  previewTitle={item.previewTitle}
                  revealedTitle={item.revealedTitle}
                  onReveal={() =>
                    showAdvantages
                      ? handleAdvantageReveal(index)
                      : handleDisadvantageReveal(index)
                  }
                />
              )
            )}
          </div>

          {showAdvantages && (
            <p className="personal-cards-progress">
              {allAdvantagesVisited
                ? "כל היתרונות נפתחו! אפשר להמשיך."
                : `נפתחו ${visitedAdvantages.length} מתוך 3 יתרונות`}
            </p>
          )}

          {showDisadvantages && (
            <p className="personal-cards-progress">
              {allDisadvantagesVisited
                ? "כל החסרונות נפתחו! אפשר להמשיך."
                : `נפתחו ${visitedDisadvantages.length} מתוך 2 חסרונות`}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default PersonalExample;