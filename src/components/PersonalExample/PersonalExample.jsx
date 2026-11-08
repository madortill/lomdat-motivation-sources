import React from "react";
import "./PersonalExample.css";

import GoCards from "../GoCards/GoCards.jsx";
import bubbleIcon from "../../../media/images/infoPages/bubble-icon.svg";
import spinningWheelIcon from "../../../media/images/infoPages/spinning-wheel-icon.svg";

function PersonalExample({ infoStep }) {
  const showAdvantages = infoStep === 5;
  const showDisadvantages = infoStep === 6;

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
              : "חסרונות"}
          </h3>

          <div className="personal-cards-list">
            {(showAdvantages ? advantages : disadvantages).map((item, index) => (
              <GoCards
                key={`${infoStep}-${index}`}
                icon={spinningWheelIcon}
                previewTitle={item.previewTitle}
                revealedTitle={item.revealedTitle}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PersonalExample;