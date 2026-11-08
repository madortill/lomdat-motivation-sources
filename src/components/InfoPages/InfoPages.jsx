import React from "react";
import "./InfoPages.css";

import InfoPopup from "../InfoPopup/InfoPopup.jsx";
import Authority from "../Authority/Authority.jsx";
import PersonalExample from "../PersonalExample/PersonalExample.jsx";
import Professionalism from "../Professionalism/Professionalism.jsx";
import ValuesSource from "../ValuesSource/ValuesSource.jsx";
import RelationshipSource from "../RelationshipSource/RelationshipSource.jsx";

import carBackground from "../../../media/images/infoPages/car-background.svg";
import battery from "../../../media/images/infoPages/battery.svg";
import spinningWheel from "../../../media/images/infoPages/spinning-wheel.svg";
import fuel from "../../../media/images/infoPages/fuel.svg";
import rightWheel from "../../../media/images/infoPages/right-wheel-icon.svg";
import leftWheel from "../../../media/images/infoPages/left-wheel.svg";
import engine from "../../../media/images/infoPages/engine.svg";

function InfoPages({
  infoStep,
  openBattery,
  openSpinningWheel,
  openFuel,
  openValuesSource,
  openRelationshipSource,
  closeInfoPopup,
  changeInfoTab,
  onValuesCardVisit,
  visitedValuesCards,
  valuesCardIndexes,
  batteryCompleted,
  personalExampleCompleted,
  professionalismCompleted,
  valuesSourceCompleted,
  relationshipSourceCompleted
}) {
  const showPopup = infoStep > 0;

  const isAuthority = infoStep >= 1 && infoStep <= 3;
  const isPersonalExample = infoStep >= 4 && infoStep <= 6;
  const isProfessionalism = infoStep >= 7 && infoStep <= 12;
  const isValuesSource = infoStep >= 13 && infoStep <= 15;
  const isRelationshipSource = infoStep >= 16 && infoStep <= 19;

  const popupTitle = isAuthority
    ? "מקור הסמכות"
    : isPersonalExample
      ? "מקור דוגמה אישית"
      : isProfessionalism
        ? "מקור המקצועיות"
        : isValuesSource
          ? "מקור הערכיות"
          : isRelationshipSource
            ? "מקור היחס האישי"
            : "";

  return (
    <div className="info-pages">
      <img
        className="info-car"
        src={carBackground}
        alt="מכונית במוסך"
      />

      <h1 className="info-title">
        מקורות הכוח וההנעה
      </h1>

      <h2 className="info-subtitle">
        - לחצו על החלקים הזוהרים כדי ללמוד, תוכלו לחזור עליהם בלחיצה -
      </h2>

      {!showPopup && (
        <>
          {/* מקור הסמכות – מצבר */}
          <button
            type="button"
            className={`battery-button ${batteryCompleted ? "completed" : ""}`}
            onClick={openBattery}
            aria-label="למידה על מקור הסמכות"
          >
            <img src={battery} alt="מצבר" />
          </button>

          {/* מקור דוגמה אישית – הגה */}
          {batteryCompleted && (
            <button
              type="button"
              className={`spinning-wheel-button ${personalExampleCompleted ? "completed" : ""}`}
              onClick={openSpinningWheel}
              aria-label="למידה על מקור דוגמה אישית"
            >
              <img src={spinningWheel} alt="גלגל ההגה" />
            </button>
          )}

          {/* מקור המקצועיות – פתח תדלוק */}
          {personalExampleCompleted && (
            <button
              type="button"
              className={`fuel-button ${professionalismCompleted ? "completed" : ""}`}
              onClick={openFuel}
              aria-label="למידה על מקור המקצועיות"
            >
              <img src={fuel} alt="פתח תדלוק" />
            </button>
          )}

          {/* מקור הערכיות – גלגלי המכונית */}
          {professionalismCompleted && (
            <>
              <button
                type="button"
                className={`values-wheel-button values-wheel-right ${valuesSourceCompleted ? "completed" : ""}`}
                onClick={openValuesSource}
                aria-label="למידה על מקור הערכיות באמצעות הגלגל הימני"
              >
                <img src={rightWheel} alt="גלגל ימני" />
              </button>

              <button
                type="button"
                className={`values-wheel-button values-wheel-left ${valuesSourceCompleted ? "completed" : ""}`}
                onClick={openValuesSource}
                aria-label="למידה על מקור הערכיות באמצעות הגלגל השמאלי"
              >
                <img src={leftWheel} alt="גלגל שמאלי" />
              </button>
            </>
          )}

          {/* מקור היחס האישי – מנוע */}
          {valuesSourceCompleted && (
            <button
              type="button"
              className={`engine-button ${relationshipSourceCompleted ? "completed" : ""}`}
              onClick={openRelationshipSource}
              aria-label="למידה על מקור היחס האישי"
            >
              <img src={engine} alt="מנוע המכונית" />
            </button>
          )}
        </>
      )}

      {showPopup && (
        <InfoPopup
          title={popupTitle}
          onClose={closeInfoPopup}
        >
          {isAuthority && (
            <Authority
              infoStep={infoStep}
              changeInfoTab={changeInfoTab}
            />
          )}

          {isPersonalExample && (
            <PersonalExample
              infoStep={infoStep}
            />
          )}

          {isProfessionalism && (
            <Professionalism
              infoStep={infoStep}
            />
          )}

          {isValuesSource && (
            <ValuesSource
              infoStep={infoStep}
              onCardVisit={onValuesCardVisit}
              visitedCards={visitedValuesCards}
              valuesCardIndexes={valuesCardIndexes}
            />
          )}

          {isRelationshipSource && (
            <RelationshipSource
              infoStep={infoStep}
            />
          )}
        </InfoPopup>
      )}
    </div>
  );
}

export default InfoPages;