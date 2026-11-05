import React from "react";
import "./InfoPages.css";

import carBackground from "../../../media/images/infoPages/car-background.svg";
import battery from "../../../media/images/infoPages/battery.svg";
import timerIcon from "../../../media/images/infoPages/timer-icon.svg";
import brainIcon from "../../../media/images/infoPages/brain-icon.svg";
import rankIcon from "../../../media/images/infoPages/rank-icon.svg";
import resistanceIcon from "../../../media/images/infoPages/resistance-icon.svg";
import spyIcon from "../../../media/images/infoPages/spy-icon.svg";
import lockIcon from "../../../media/images/infoPages/lock-icon.svg";

function InfoPages({
  infoStep,
  openBattery,
  closeInfoPopup,
  changeInfoTab,
  batteryCompleted
}) {
  const showPopup = infoStep > 0;
  const showTabs = infoStep >= 2;
  const activeTab = infoStep === 3 ? "disadvantages" : "advantages";

  const advantages = [
    {
      icon: timerIcon,
      text: "ביצוע הפעולה בזמן מיידי ללא הסברים",
      result: "חיסכון בזמן בטווח הקצר"
    },
    {
      icon: brainIcon,
      text: "ברורה וקלה להבנה"
    },
    {
      icon: rankIcon,
      text: "סמכות מוקנית אוטומטית מתוקף הדרגה"
    }
  ];

  const disadvantages = [
    {
      icon: resistanceIcon,
      text: "יוצר התנגדות ומרירות"
    },
    {
      icon: spyIcon,
      text: "דורש פיקוח ישיר צמוד"
    },
    {
      icon: lockIcon,
      text: "מפחית את האפשרות להפנמה ולמשמעת עצמית של החייל"
    }
  ];

  return (
    <div className="info-pages">
      <img className="info-car" src={carBackground} alt="מכונית במוסך" />

      <h1 className="info-title">מקורות הכוח וההנעה</h1>
      <h2 className="info-subtitle">
        - לחצו על החלקים הזוהרים כדי ללמוד, תוכלו לחזור עליהם בלחיצה -
      </h2>

      {!showPopup && (
        <button
          className={`battery-button ${batteryCompleted ? "completed" : ""}`}
          onClick={openBattery}
          aria-label="למידה על מקור הסמכות"
        >
          <img src={battery} alt="מצבר" />
        </button>
      )}

      {showPopup && (
        <div className="info-popup-overlay">
          <div className="info-popup">

            <button
              className="info-close-button"
              onClick={closeInfoPopup}
              aria-label="סגירת החלונית"
            >
              ×
            </button>

            <h2 className="info-popup-title">מקור הסמכות</h2>

            {!showTabs ? (
              <div className="authority-definition">
                <p>
                  מקור הסמכות נובע מכך שצה״ל הוא
                  <strong> מערכת היררכית</strong>,
                  המניחה כי למפקד יש זכות חוקית להשפיע על פקודיו.
                </p>

                <p>
                  כאשר החייל לא יבצע משימה כראוי,
                  מפקדו יתקן וילמד אותו כיצד לבצע
                  את המשימה כראוי.
                </p>

                <p>
                  במידה ויזלזל/ לא יבצע את המשימה
                  כראוי יקבל מענה בהתאם.
                </p>

                <p>
                  לעומת זאת,
                  <strong> אם החייל יתמיד וישאף למצוינות,
                  הוא יתוגמל בהתאם.</strong>
                </p>
              </div>
            ) : (
              <div className="authority-tabs-section">
                <div className="authority-tabs">
                  <button
                    className={`authority-tab ${activeTab === "advantages" ? "active" : ""}`}
                    onClick={() => changeInfoTab(2)}
                  >
                    יתרונות
                  </button>

                  <button
                    className={`authority-tab ${activeTab === "disadvantages" ? "active" : ""}`}
                    onClick={() => changeInfoTab(3)}
                  >
                    חסרונות
                  </button>
                </div>

                <div className="authority-tab-content">
                  {activeTab === "advantages" ? (
                    <div className="authority-cards">
                      <div className="authority-card authority-card-wide">
                        <img src={advantages[0].icon} alt="" />
                        <p>{advantages[0].text}</p>
                        <span className="authority-down-arrow">↓</span>
                        <p>{advantages[0].result}</p>
                      </div>

                      <div className="authority-cards-row">
                        {advantages.slice(1).map((item, index) => (
                          <div className="authority-card" key={index}>
                            <img src={item.icon} alt="" />
                            <p>{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="authority-cards">
                      <div className="authority-cards-row">
                        {disadvantages.slice(0, 2).map((item, index) => (
                          <div className="authority-card" key={index}>
                            <img src={item.icon} alt="" />
                            <p>{item.text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="authority-card authority-card-wide">
                        <img src={disadvantages[2].icon} alt="" />
                        <p>{disadvantages[2].text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoPages;