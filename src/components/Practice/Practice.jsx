import React, { useRef, useState } from "react";
import "./Practice.css";

import usePersistentState from "../../hooks/usePersistentState.js";

import practiceBackground from "../../../media/images/Practice/practice-background.svg";
import batteryLight from "../../../media/images/Practice/battery-light.svg";
import oilLight from "../../../media/images/Practice/oil-light.svg";

const exercises = {
  battery: {
    title: "מקור הסמכות",
    light: batteryLight,
    statements: [
      { id: 1, text: "יוצר תחושת מרירות", answer: "disadvantages" },
      { id: 2, text: "ברורה וקלה להבנה", answer: "advantages" },
      { id: 3, text: "סמכות מוקנית אוטומטית מתוקף הדרגה", answer: "advantages" },
      { id: 4, text: "מפחית את האפשרות להפנמה ולמשמעת עצמית של החייל", answer: "disadvantages" },
      { id: 5, text: "דורש פיקוח ישיר/עקיף", answer: "disadvantages" },
      { id: 6, text: "חיסכון בזמן בטווח הקצר", answer: "advantages" },
      { id: 7, text: "לוקח זמן לרכוש מיומנות זו", answer: "neither" },
      { id: 8, text: "משרה על החייל תחושה של ביטחון ואמון", answer: "neither" }
    ]
  },

  oil: {
    title: "מקור הסמכות",
    light: oilLight,
    statements: [
      {
        id: 1,
        text: "סמכות מוקנית אוטומטית מתוקף הדרגה",
        answer: "advantages"
      },
      {
        id: 2,
        text: "יוצר תחושת מרירות",
        answer: "disadvantages"
      },
      {
        id: 3,
        text: "חיסכון בזמן בטווח הקצר",
        answer: "advantages"
      },
      {
        id: 4,
        text: "דורש פיקוח ישיר/עקיף",
        answer: "disadvantages"
      },
      {
        id: 5,
        text: "ברורה וקלה להבנה",
        answer: "advantages"
      },
      {
        id: 6,
        text: "מפחית את האפשרות להפנמה ולמשמעת עצמית של החייל",
        answer: "disadvantages"
      }
    ]
  }
};

function Practice({
  exercise = "battery",
  phase,
  onStart,
  onContinue,
  onSolvedChange
}) {
  const config = exercises[exercise];
  const statements = config.statements;

  const storagePrefix = `lomda-practice-${exercise}-v2`;

  const [placements, setPlacements] = usePersistentState(
    `${storagePrefix}-placements`,
    {}
  );

  const [cursor, setCursor] = usePersistentState(
    `${storagePrefix}-cursor`,
    0
  );

  const [checked, setChecked] = usePersistentState(
    `${storagePrefix}-checked`,
    false
  );

  const [message, setMessage] = usePersistentState(
    `${storagePrefix}-message`,
    ""
  );

  const [selectedId, setSelectedId] = useState(null);
  const [drag, setDrag] = useState(null);

  const practiceRef = useRef(null);
  const pointerRef = useRef(null);
  const advantagesRef = useRef(null);
  const disadvantagesRef = useRef(null);
  const neitherRef = useRef(null);

  const remaining = statements.filter(
    (item) => !placements[item.id]
  );

  const visibleCount = Math.min(3, remaining.length);

  const safeCursor = remaining.length
    ? cursor % remaining.length
    : 0;

  const visibleCards = Array.from(
    { length: visibleCount },
    (_, index) =>
      remaining[(safeCursor + index) % remaining.length]
  );

  const placedAdvantages = statements.filter(
    (item) => placements[item.id] === "advantages"
  );

  const placedDisadvantages = statements.filter(
    (item) => placements[item.id] === "disadvantages"
  );

  const placedNeither = statements.filter(
    (item) => placements[item.id] === "neither"
  );

  const allPlaced = remaining.length === 0;

  const allCorrect = statements.every(
    (item) => placements[item.id] === item.answer
  );

  const canContinue = checked && allCorrect;

  const invalidateSubmission = () => {
    setChecked(false);
    setMessage("");
    onSolvedChange(false);
  };

  const moveCarousel = (direction) => {
    if (remaining.length <= 1) return;

    setCursor((prev) =>
      (prev + direction + remaining.length) % remaining.length
    );
  };

  const placeCard = (id, category) => {
    setPlacements((prev) => ({
      ...prev,
      [id]: category
    }));

    setSelectedId(null);
    setDrag(null);
    setCursor(0);

    invalidateSubmission();
  };

  const returnCard = (id) => {
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    setSelectedId(null);
    setDrag(null);
    setCursor(0);

    invalidateSubmission();
  };

  const getDropCategory = (x, y) => {
    const zones = [
      {
        category: "advantages",
        element: advantagesRef.current
      },
      {
        category: "disadvantages",
        element: disadvantagesRef.current
      },
      {
        category: "neither",
        element: neitherRef.current
      }
    ];

    for (const zone of zones) {
      if (!zone.element) continue;

      const rect = zone.element.getBoundingClientRect();

      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return zone.category;
      }
    }

    return null;
  };

  const handlePointerDown = (event, id, origin) => {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    pointerRef.current = {
      id,
      origin,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const pointer = pointerRef.current;

    if (
      !pointer ||
      pointer.pointerId !== event.pointerId
    ) {
      return;
    }

    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;

    const distance = Math.hypot(dx, dy);

    const shouldDrag =
      pointer.origin === "placed"
        ? distance > 7
        : dy < -10 && Math.abs(dy) > Math.abs(dx);

    if (
      shouldDrag ||
      drag?.id === pointer.id
    ) {
      setDrag({
        id: pointer.id,
        origin: pointer.origin,
        left: event.clientX - pointer.offsetX,
        top: event.clientY - pointer.offsetY,
        width: pointer.width,
        height: pointer.height,
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  const handlePointerUp = (event) => {
    const pointer = pointerRef.current;

    if (
      !pointer ||
      pointer.pointerId !== event.pointerId
    ) {
      return;
    }

    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;

    const distance = Math.hypot(dx, dy);

    const category = getDropCategory(
      event.clientX,
      event.clientY
    );

    if (pointer.origin === "placed") {
      if (distance > 10) {
        if (
          category &&
          category !== placements[pointer.id]
        ) {
          placeCard(pointer.id, category);
        }
      } else {
        returnCard(pointer.id);
      }
    } else {
      if (
        category &&
        dy < -10 &&
        Math.abs(dy) > Math.abs(dx)
      ) {
        placeCard(pointer.id, category);
      } else if (
        Math.abs(dx) > 35 &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        moveCarousel(dx > 0 ? -1 : 1);
      } else if (distance < 12) {
        setSelectedId(pointer.id);
      }
    }

    pointerRef.current = null;
    setDrag(null);
  };

  const handlePointerCancel = () => {
    pointerRef.current = null;
    setDrag(null);
  };

  const handleZoneClick = (category) => {
    if (selectedId === null) return;

    placeCard(selectedId, category);
  };

  const checkAnswers = () => {
    if (!allPlaced) {
      setChecked(false);
      onSolvedChange(false);

      setMessage(
        `יש לשבץ את כל ${statements.length} ההיגדים לפני ההגשה.`
      );

      return;
    }

    setChecked(true);

    if (allCorrect) {
      setMessage(
        "כל הכבוד! כל התשובות נכונות."
      );

      onSolvedChange(true);
    } else {
      setMessage(
        "יש תשובות שגויות. גררו אותן לאזור המתאים והגישו שוב."
      );

      onSolvedChange(false);
    }
  };

  const renderPlacedCard = (item) => {
    const isCorrect =
      placements[item.id] === item.answer;

    const isDragging =
      drag?.id === item.id;

    return (
      <button
        key={item.id}
        type="button"
        className={`practice-placed-card ${
          checked
            ? isCorrect
              ? "correct"
              : "incorrect"
            : ""
        } ${
          isDragging
            ? "practice-card-origin-dragging"
            : ""
        }`}
        onPointerDown={(event) =>
          handlePointerDown(
            event,
            item.id,
            "placed"
          )
        }
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            returnCard(item.id);
          }
        }}
        aria-label={`${item.text}. גררו לאזור אחר או לחצו להחזרה לסליידר`}
      >
        {item.text}
      </button>
    );
  };

  const draggedStatement = drag
    ? statements.find(
        (item) => item.id === drag.id
      )
    : null;

  const draggedCategory = drag
    ? getDropCategory(drag.x, drag.y)
    : null;

  const practiceRect =
    practiceRef.current?.getBoundingClientRect();

  return (
    <div
      className="practice-page"
      ref={practiceRef}
    >
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
        <>
          <section
            className="practice-board"
            aria-label={`תרגול ${config.title}`}
          >
            <h1>
              תרגול – {config.title}
            </h1>

            <p className="practice-instructions">
              התאימו בין ההיגדים למקומות המתאימים להם
            </p>

            {[
              { id: "advantages", label: "יתרונות", ref: advantagesRef, cards: placedAdvantages },
              { id: "disadvantages", label: "חסרונות", ref: disadvantagesRef, cards: placedDisadvantages },
              { id: "neither", label: "לא יתרון ולא חיסרון", ref: neitherRef, cards: placedNeither }
            ].map((zone) => (
              <div className="practice-drop-section" key={zone.id}>
                <h2>{zone.label}</h2>
                <div
                  ref={zone.ref}
                  className={`practice-drop-zone practice-zone-${zone.id} ${
                    selectedId !== null || draggedCategory === zone.id ? "ready" : ""
                  }`}
                  onClick={() => handleZoneClick(zone.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleZoneClick(zone.id);
                    }
                  }}
                  aria-label={`אזור ${zone.label}`}
                >
                  {zone.cards.map(renderPlacedCard)}
                </div>
              </div>
            ))}

            <p className={`practice-feedback ${canContinue ? "success" : ""}`} role="status">
              {message}
            </p>
            {canContinue ? (
              <button type="button" className="practice-check-button" onClick={onContinue}>
                המשך
              </button>
            ) : (
              <button type="button" className="practice-check-button" onClick={checkAnswers}>
                הגשה
              </button>
            )}
          </section>

          <section
            className="practice-tray"
            aria-label="סליידר היגדים"
          >
            <button
              type="button"
              className="practice-tray-arrow"
              onClick={() =>
                moveCarousel(-1)
              }
              disabled={
                remaining.length <= 1
              }
              aria-label="כרטיסייה קודמת"
            >
              ▶
            </button>

            <div className="practice-carousel">
              {remaining.length === 0 ? (
                <p className="practice-tray-empty">
                  כל ההיגדים שובצו
                </p>
              ) : (
                visibleCards.map((item) => {
                  const isDragging =
                    drag?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`practice-statement-card ${
                        selectedId === item.id
                          ? "selected"
                          : ""
                      } ${
                        isDragging
                          ? "practice-card-origin-dragging"
                          : ""
                      }`}
                      onPointerDown={(event) =>
                        handlePointerDown(
                          event,
                          item.id,
                          "tray"
                        )
                      }
                      onPointerMove={
                        handlePointerMove
                      }
                      onPointerUp={
                        handlePointerUp
                      }
                      onPointerCancel={
                        handlePointerCancel
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          setSelectedId(item.id);
                        }
                      }}
                      aria-label={`היגד: ${item.text}`}
                    >
                      {item.text}
                    </button>
                  );
                })
              )}
            </div>

            <button
              type="button"
              className="practice-tray-arrow"
              onClick={() =>
                moveCarousel(1)
              }
              disabled={
                remaining.length <= 1
              }
              aria-label="כרטיסייה הבאה"
            >
              ◀
            </button>
          </section>

          {draggedStatement && practiceRect && (
            <div
              className={`practice-drag-preview ${
                drag.origin === "placed"
                  ? "practice-placed-card"
                  : "practice-statement-card"
              }`}
              style={{
                left:
                  drag.left -
                  practiceRect.left,
                top:
                  drag.top -
                  practiceRect.top,
                width: drag.width,
                height: drag.height
              }}
              aria-hidden="true"
            >
              {draggedStatement.text}
            </div>
          )}

        </>
      )}

      {phase === "complete" && (
        <section className="practice-complete-screen">
          <h1>כל הכבוד!</h1>
          <p>
            השלמתם בהצלחה את שני התרגולים.
          </p>
        </section>
      )}
    </div>
  );
}

export default Practice;