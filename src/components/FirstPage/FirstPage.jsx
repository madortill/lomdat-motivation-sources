import React, { useState, useEffect } from "react";
import "./FirstPage.css";

import startButtonIcon from "../../../media/images/button-arrow.svg";
import redCar from "../../../media/images/FirstPage/first-red-car.svg";
import smoke from "../../../media/images/FirstPage/smoke.svg";
import beigeArrow from "../../../media/images/FirstPage/beige-arrow.svg";

function FirstPage({ onNext }) {
    const [isDriving, setIsDriving] = useState(false);
    const [smokeCount, setSmokeCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!isDriving) return;

        const interval = setInterval(() => {
            setSmokeCount((prev) => Math.min(prev + 1, 7));
        }, 220);

        return () => clearInterval(interval);
    }, [isDriving]);

    const handleStart = () => {
        if (isDriving) return;
        setIsDriving(true);
    };

    const handleCarAnimationEnd = (event) => {
        if (event.animationName === "carDrive") {
            setShowPopup(true);
        }
    };

    return (
        <div className="first-page">
            <h1 className="welcome-title">ברוכים הבאים אל</h1>
            <h1 className="main-title">לומדת מקורות הכוח וההנעה</h1>

            <button className="start-button" onClick={handleStart} disabled={isDriving}>
                שנתניע?
                <img className="start-button-icon" src={startButtonIcon} alt="" />
            </button>

            <div className="car-animation-area">
                {Array.from({ length: smokeCount }).map((_, index) => (
                    <img
                        key={index}
                        className={`car-smoke smoke-${index + 1}`}
                        src={smoke}
                        alt=""
                    />
                ))}

                <img
                    className={`first-page-red-car ${isDriving ? "car-driving" : "car-idle"}`}
                    src={redCar}
                    alt="מכונית אדומה"
                    onAnimationEnd={handleCarAnimationEnd}
                />
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <p>
                            טוב, לא ככה תכננו להתחיל.
                            <br />
                            נראה שלרכב שלנו יש בעיה בהתנעה.
                        </p>

                        <p>
                            ואם כבר מדברים על הנעה, מה בעצם מניע מפקד?
                        </p>

                        <p>
                            בואו נגלה מה נותן לנו את הכוח להוביל, נכיר את מקורות הכוח וההנעה של המפקד, וגם על הדרך נצליח להחזיר את הרכב שלנו לפעולה!
                        </p>

                        <button className="popup-button" onClick={onNext}>
                            <span>יאללה, בודקים!</span>
                            <img src={beigeArrow} alt="" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FirstPage;