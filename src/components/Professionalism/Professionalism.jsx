import React from "react";
import "./Professionalism.css";

import fuelPump from "../../../media/images/infoPages/fuel-pump.svg";
import dropIcon from "../../../media/images/infoPages/drop.svg";

function Professionalism({ infoStep }) {
  const isDefinition = infoStep === 7;
  const isAdvantages = infoStep >= 8 && infoStep <= 10;
  const isDisadvantages = infoStep >= 11 && infoStep <= 12;

  const advantages = [
    "ככל שלמפקד יש יותר ידע וביטחון, כך החיילים יבטחו בו יותר",
    "יכולת להוות לחיילים ולאנשים הסובבים מודל לחיקוי מקצועי",
    "מקנה לחייל תחושת ביטחון ויוצרת ודאות ושקט"
  ];

  const disadvantages = [
    "לחץ רב וביקוש גבוה מצד הסביבה",
    "העמסת תחושת אחריות מוגברת והגברת תחושת הנטל על המפקד"
  ];

  const visibleAdvantages = infoStep === 8 ? 1 : infoStep === 9 ? 2 : infoStep === 10 ? 3 : 0;
  const visibleDisadvantages = infoStep === 11 ? 1 : infoStep === 12 ? 2 : 0;

  return (
    <div className="professionalism-content">
      {isDefinition && (
        <div className="professionalism-definition">
          <p>
            כוח זה נובע מתפיסתו של המפקד
            כגורם בעל יכולת להשפיע על פקודיו
            בזכות הידע המקצועי שלו
            ובזכות ניסיונו.
          </p>

          <p>
            ככל שלחיילים יש תחושה שמפקדם
            מקצועי, מבין ויודע לתת מענה,
            כך גוברת הנכונות ללכת אחריו.
          </p>
        </div>
      )}

      {(isAdvantages || isDisadvantages) && (
        <div className="professionalism-drops-screen">
          <img className="professionalism-pump" src={fuelPump} alt="" />

          <h3 className="professionalism-subtitle">
            {isAdvantages ? "יתרונות" : "חסרונות"}
          </h3>

<div className={`professionalism-drops ${isAdvantages ? "advantages" : "disadvantages"}`}>
  {isAdvantages &&
    advantages.slice(0, visibleAdvantages).map((text, index) => (
      <div
        className={`professionalism-drop professionalism-drop-${index + 1}`}
        key={`advantage-${index}`}
      >
        <img src={dropIcon} alt="" />
        <span>{text}</span>
      </div>
    ))}

  {isDisadvantages &&
    disadvantages.slice(0, visibleDisadvantages).map((text, index) => (
      <div
        className={`professionalism-drop professionalism-drop-${index + 1}`}
        key={`disadvantage-${index}`}
      >
        <img src={dropIcon} alt="" />
        <span>{text}</span>
      </div>
    ))}
</div>
        </div>
      )}
    </div>
  );
}

export default Professionalism;