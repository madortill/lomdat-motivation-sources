import React from "react";
import "./ValuesSource.css";

import WheelCards from "../WheelCards/WheelCards.jsx";

const advantages = [
  "מעביר תחושת אחדות, חוזקות ועקביות ומחזק את תחושת השייכות",
  "מציב לחיילים רף התנהגות ומסמן להם לאן לשאוף ולהתפתח",
  "פועל על מכנה משותף וקווי דמיון בין המפקד לחייליו"
];

const disadvantages = [
  "אפקט מצטבר ולא מיידי – אמון והזדהות עם ערכיות המפקד הם תהליך מתמשך שלוקח זמן"
];

function ValuesSource({
  infoStep,
  onCardVisit,
  visitedCards,
  valuesCardIndexes,
  onOpenDisadvantages
}) {
  const isDefinition = infoStep === 13;
  const isAdvantages = infoStep === 14;
  const isDisadvantages = infoStep === 15;
  const canOpenDisadvantages =
    isAdvantages &&
    [0, 1, 2].every((index) =>
      visitedCards.advantages.includes(index)
    );
  return (
    <div className="values-source">
      {isDefinition && (
        <div className="values-definition">
          <p>
            למפקד יכולת השפעה על פקודיו
            <strong> מתוקף מערכת הערכים המשותפת להם.</strong>
          </p>

          <p>
            מפקד המשתמש במקור כוח זה מנסה להשפיע על פקודיו
            באמצעות מערכת ערכים משותפת, ולחזק את תחושת
            השייכות וההזדהות שלהם.
          </p>

          <p>
            המפקד מהווה עבור חייליו דוגמה לערכים
            שבהם הוא מאמין ופועל על פיהם.
          </p>
        </div>
      )}

      {(isAdvantages || isDisadvantages) && (
        <div className="values-cards-content">
          <div className={`values-card-group ${isDisadvantages ? "values-group-muted" : ""}`}>
            <h3 className="values-cards-title">יתרונות</h3>

            <WheelCards
              cards={advantages}
              category="advantages"
              activeIndex={valuesCardIndexes.advantages}
              onVisit={onCardVisit}
              disabled={isDisadvantages}
            />
          </div>

          <div
            className={`values-card-group ${isAdvantages ? "values-group-muted" : ""
              } ${canOpenDisadvantages ? "values-group-clickable" : ""
              }`}
            onClick={canOpenDisadvantages ? onOpenDisadvantages : undefined}
            onKeyDown={(event) => {
              if (
                canOpenDisadvantages &&
                (event.key === "Enter" || event.key === " ")
              ) {
                event.preventDefault();
                onOpenDisadvantages?.();
              }
            }}
            role={canOpenDisadvantages ? "button" : undefined}
            tabIndex={canOpenDisadvantages ? 0 : undefined}
            aria-label={
              canOpenDisadvantages
                ? "לחצו למעבר לחסרונות"
                : undefined
            }
          >
            <h3 className="values-cards-title">חסרונות</h3>

            <WheelCards
              cards={disadvantages}
              category="disadvantages"
              activeIndex={valuesCardIndexes.disadvantages}
              onVisit={onCardVisit}
              disabled={isAdvantages}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ValuesSource;