import React from "react";
import "./RelationshipSource.css";

import mechanicWheel from "../../../media/images/infoPages/mechanic-wheel.svg";

const advantages = [
  'הגנה והכלה פסיכולוגית – "גם אני הייתי שם"',
  "יצירת אווירה אמפתית וקרובה בין המפקדים לחיילים"
];

const disadvantages = [
  "קרבת יתר תקשה על הצבת גבולות ודרישות ברורות",
  "סכנה לקונפליקט וליחס לא שוויוני"
];

function RelationshipGear({ text, position, muted = false, direction = "clockwise" }) {
  return (
    <div
      className={`relationship-gear relationship-gear-${position} ${muted ? "relationship-gear-muted" : ""}`}
    >
      <div className="relationship-gear-entrance">
        <div className={`relationship-gear-rotation ${direction}`}>
          <img src={mechanicWheel} alt="" />
        </div>
        <span className="relationship-gear-text">{text}</span>
      </div>
    </div>
  );
}

function RelationshipSource({ infoStep }) {
  const isDefinition = infoStep === 16;
  const isAdvantages = infoStep === 17 || infoStep === 18;
  const isDisadvantages = infoStep === 19;

  return (
    <div className="relationship-source">
      {isDefinition && (
        <div className="relationship-definition">
          <p>
            למפקד יש השפעה על פקודיו באמצעות
            <strong> אמפתיה ויחס אישי.</strong>
          </p>

          <p>
            באמצעותם גורם המפקד להרגשת נוחות
            לפנות אליו בכל נושא.
          </p>

          <p>
            כך, נוצרת קרבה רגשית בין המפקד לחייליו.
          </p>
        </div>
      )}

      {(isAdvantages || isDisadvantages) && (
        <div className="relationship-gears-screen">
          <h3 className="relationship-section-title">
            {isAdvantages ? "יתרונות" : "חסרונות"}
          </h3>

          <div className="relationship-gears-area">
            <RelationshipGear
              text={advantages[0]}
              position="advantage-1"
              muted={isDisadvantages}
              direction="clockwise"
            />

            {(infoStep >= 18) && (
              <RelationshipGear
                text={advantages[1]}
                position="advantage-2"
                muted={isDisadvantages}
                direction="counterclockwise"
              />
            )}

            {isDisadvantages && (
              <>
                <RelationshipGear
                  text={disadvantages[0]}
                  position="disadvantage-1"
                  direction="clockwise"
                />

                <RelationshipGear
                  text={disadvantages[1]}
                  position="disadvantage-2"
                  direction="counterclockwise"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RelationshipSource;