import React from "react";
import "./App.css";

import usePersistentState from "./hooks/usePersistentState.js";

import mglLogo from "../media/images/logos/mgl-logo.svg";
import tillLogo from "../media/images/logos/till-logo.svg";
import tohadLogo from "../media/images/logos/tohad-logo.svg";

import FirstPage from "./components/FirstPage/FirstPage.jsx";
import OpenedDrawer from "./components/OpenedDrawer/OpenedDrawer.jsx";
import InfoPages from "./components/InfoPages/InfoPages.jsx";
import NavigationArrows from "./components/NavigationArrows/NavigationArrows.jsx";
import Practice from "./components/Practice/Practice.jsx";
import OilPractice from "./components/Practice/OilPractice.jsx";
import WrittenPractice from "./components/Practice/WrittenPractice.jsx";
import EndPractice from "./components/EndPractice/EndPractice.jsx";

function App() {
  const [currentPage, setCurrentPage] = usePersistentState(
    "lomda-current-page",
    0
  );

  const [infoStep, setInfoStep] = usePersistentState(
    "lomda-info-step",
    0
  );

  const [practicePhase, setPracticePhase] = usePersistentState(
    "lomda-practice-phase",
    "intro"
  );

  const [practiceExercise, setPracticeExercise] = usePersistentState(
    "lomda-practice-exercise",
    "battery"
  );

  const [practiceSolved, setPracticeSolved] = usePersistentState(
    "lomda-practice-solved",
    false
  );

  const [visitedTabs, setVisitedTabs] = usePersistentState(
    "lomda-visited-tabs",
    []
  );

  const [batteryCompleted, setBatteryCompleted] = usePersistentState(
    "lomda-battery-completed",
    false
  );

  const [personalExampleCompleted, setPersonalExampleCompleted] =
    usePersistentState(
      "lomda-personal-example-completed",
      false
    );

  const [professionalismCompleted, setProfessionalismCompleted] =
    usePersistentState(
      "lomda-professionalism-completed",
      false
    );

  const [valuesSourceCompleted, setValuesSourceCompleted] =
    usePersistentState(
      "lomda-values-source-completed",
      false
    );

  const [relationshipSourceCompleted, setRelationshipSourceCompleted] =
    usePersistentState(
      "lomda-relationship-source-completed",
      false
    );

  const [visitedValuesCards, setVisitedValuesCards] = usePersistentState(
    "lomda-visited-values-cards",
    {
      advantages: [],
      disadvantages: []
    }
  );

  const [valuesCardIndexes, setValuesCardIndexes] = usePersistentState(
    "lomda-values-card-indexes",
    {
      advantages: 0,
      disadvantages: 0
    }
  );

  const pages = ["first", "drawer", "info", "practice"];

  const hasVisitedBothTabs =
    visitedTabs.includes(2) && visitedTabs.includes(3);

  const allValuesAdvantagesVisited =
    visitedValuesCards.advantages.length === 3;

  const allValuesDisadvantagesVisited =
    visitedValuesCards.disadvantages.length === 1;

  const openBattery = () => {
    if (!batteryCompleted) {
      setVisitedTabs([]);
    }
    setInfoStep(1);
  };

  const openSpinningWheel = () => {
    if (!batteryCompleted) return;
    setInfoStep(4);
  };

  const openFuel = () => {
    if (!personalExampleCompleted) return;
    setInfoStep(7);
  };

  const openValuesSource = () => {
    if (!professionalismCompleted) return;
    setInfoStep(13);
  };

  const openRelationshipSource = () => {
    if (!valuesSourceCompleted) return;
    setInfoStep(16);
  };

  const closeInfoPopup = () => {
    setInfoStep(0);
  };

  const changeInfoTab = (step) => {
    setVisitedTabs((prev) => [...new Set([...prev, step])]);
    setInfoStep(step);
  };

  const onValuesCardVisit = (category, index) => {
    setValuesCardIndexes((prev) => ({
      ...prev,
      [category]: index
    }));

    setVisitedValuesCards((prev) => {
      if (prev[category].includes(index)) return prev;

      return {
        ...prev,
        [category]: [...prev[category], index]
      };
    });
  };

  const continuePractice = () => {
    if (!practiceSolved || practicePhase !== "sort") return;

    if (practiceExercise === "battery") {
      setPracticeExercise("oil");
      setPracticePhase("intro");
      setPracticeSolved(false);
      return;
    }

    if (practiceExercise === "oil") {
      setPracticeExercise("heat");
      setPracticePhase("intro");
      setPracticeSolved(false);
      return;
    }

    if (practiceExercise === "heat") {
      setPracticeExercise("triangle");
      setPracticePhase("intro");
      setPracticeSolved(false);
    }
  };

  const submitWrittenPractice = () => {
    if (practiceExercise !== "triangle") return;
    setPracticePhase("complete");
  };


  const continueAfterWrittenPractice = () => {
    if (practiceExercise !== "triangle") return;
    setPracticePhase("finished");
  };

    const continueAfterEndPractice = () => {
  console.log("הנסיעה הסתיימה! ממשיכים למסך הבא.");
};


  const nextPage = () => {
    if (pages[currentPage] === "practice") return;

    if (pages[currentPage] === "info") {
      if (infoStep === 0) return;

      // מקור הסמכות
      if (infoStep === 1) {
        changeInfoTab(2);
        return;
      }

      if (infoStep === 2) {
        changeInfoTab(3);
        return;
      }

      if (infoStep === 3) {
        if (!hasVisitedBothTabs) {
          changeInfoTab(2);
          return;
        }
        setBatteryCompleted(true);
        setInfoStep(0);
        return;
      }

      // מקור דוגמה אישית
      if (infoStep === 4) {
        setInfoStep(5);
        return;
      }

      if (infoStep === 5) {
        setInfoStep(6);
        return;
      }

      if (infoStep === 6) {
        setPersonalExampleCompleted(true);
        setInfoStep(0);
        return;
      }

      // מקור המקצועיות
      if (infoStep >= 7 && infoStep <= 11) {
        setInfoStep((prev) => prev + 1);
        return;
      }

      if (infoStep === 12) {
        setProfessionalismCompleted(true);
        setInfoStep(0);
        return;
      }

      // מקור הערכיות
      if (infoStep === 13) {
        onValuesCardVisit("advantages", 0);
        setInfoStep(14);
        return;
      }

      if (infoStep === 14) {
        const currentIndex = valuesCardIndexes.advantages;

        if (currentIndex < 2) {
          onValuesCardVisit("advantages", currentIndex + 1);
          return;
        }

        if (allValuesAdvantagesVisited) {
          onValuesCardVisit("disadvantages", 0);
          setInfoStep(15);
        }
        return;
      }

      if (infoStep === 15) {
        if (!allValuesDisadvantagesVisited) return;
        setValuesSourceCompleted(true);
        setInfoStep(0);
        return;
      }

      // מקור היחס האישי
      if (infoStep === 16) {
        setInfoStep(17);
        return;
      }

      if (infoStep === 17) {
        setInfoStep(18);
        return;
      }

      if (infoStep === 18) {
        setInfoStep(19);
        return;
      }

      if (infoStep === 19) {
        setRelationshipSourceCompleted(true);
        setInfoStep(0);
        setPracticeExercise("battery");
        setPracticePhase("intro");
        setPracticeSolved(false);
        setCurrentPage(3);
        return;
      }

      return;
    }

    setCurrentPage((prev) => Math.min(prev + 1, 2));
  };

  const previousPage = () => {
    if (pages[currentPage] === "practice") {
      if (practiceExercise === "triangle") {
        if (practicePhase === "finished") {
          setPracticePhase("complete");
        } else if (practicePhase === "complete") {
          setPracticePhase("write");
        } else if (practicePhase === "write") {
          setPracticePhase("intro");
        } else {
          setPracticeExercise("heat");
          setPracticePhase("sort");
          setPracticeSolved(false);
        }
        return;
      }

      if (practicePhase === "sort") {
        setPracticePhase("intro");
        return;
      }

      if (practiceExercise === "heat") {
        setPracticeExercise("oil");
        setPracticePhase("sort");
        setPracticeSolved(false);
        return;
      }

      if (practiceExercise === "oil") {
        setPracticeExercise("battery");
        setPracticePhase("sort");
        setPracticeSolved(false);
        return;
      }

      setCurrentPage(2);
      setInfoStep(19);
      return;
    }

    if (pages[currentPage] === "info") {
      if (infoStep === 0) {
        if (relationshipSourceCompleted) {
          setInfoStep(19);
        } else if (valuesSourceCompleted) {
          setInfoStep(15);
        } else if (professionalismCompleted) {
          setInfoStep(12);
        } else if (personalExampleCompleted) {
          setInfoStep(6);
        } else if (batteryCompleted) {
          setInfoStep(3);
        } else {
          setCurrentPage(1);
        }
        return;
      }

      if (infoStep === 1) {
        setInfoStep(0);
        return;
      }

      if (infoStep === 4) {
        setInfoStep(3);
        return;
      }

      if (infoStep === 7) {
        setInfoStep(6);
        return;
      }

      if (infoStep === 13) {
        setInfoStep(12);
        return;
      }

      if (infoStep === 16) {
        setInfoStep(15);
        return;
      }

      if (infoStep === 14) {
        if (valuesCardIndexes.advantages > 0) {
          onValuesCardVisit(
            "advantages",
            valuesCardIndexes.advantages - 1
          );
        } else {
          setInfoStep(13);
        }
        return;
      }

      if (infoStep === 15) {
        setInfoStep(14);
        return;
      }

      if (infoStep === 3) {
        changeInfoTab(2);
        return;
      }

      setInfoStep((prev) => prev - 1);
      return;
    }

    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="app">
      <img className="mgl-logo" src={mglLogo} alt="mgl-logo" />
      <img className="till-logo" src={tillLogo} alt="till-logo" />
      <img className="tohad-logo" src={tohadLogo} alt="tohad-logo" />

      {pages[currentPage] === "first" && (
        <FirstPage onNext={nextPage} />
      )}

      {pages[currentPage] === "drawer" && (
        <OpenedDrawer />
      )}

      {pages[currentPage] === "info" && (
        <InfoPages
          infoStep={infoStep}
          openBattery={openBattery}
          openSpinningWheel={openSpinningWheel}
          openFuel={openFuel}
          openValuesSource={openValuesSource}
          openRelationshipSource={openRelationshipSource}
          closeInfoPopup={closeInfoPopup}
          changeInfoTab={changeInfoTab}
          onValuesCardVisit={onValuesCardVisit}
          visitedValuesCards={visitedValuesCards}
          valuesCardIndexes={valuesCardIndexes}
          batteryCompleted={batteryCompleted}
          personalExampleCompleted={personalExampleCompleted}
          professionalismCompleted={professionalismCompleted}
          valuesSourceCompleted={valuesSourceCompleted}
          relationshipSourceCompleted={relationshipSourceCompleted}
        />
      )}

      {pages[currentPage] === "practice" && (
        practiceExercise === "battery" ? (
          <Practice
            key="battery"
            exercise="battery"
            phase={practicePhase}
            onStart={() => setPracticePhase("sort")}
            onContinue={continuePractice}
            onSolvedChange={setPracticeSolved}
          />
        ) : practiceExercise === "triangle" ? (
  practicePhase === "finished" ? (
    <EndPractice onNext={continueAfterEndPractice} />
  ) : (
    <WrittenPractice
      phase={practicePhase}
      onStart={() => setPracticePhase("write")}
      onSubmit={submitWrittenPractice}
      onContinue={continueAfterWrittenPractice}
    />
  )
        ) : (
          <OilPractice
            key={practiceExercise}
            exercise={practiceExercise}
            phase={practicePhase}
            onStart={() => setPracticePhase("sort")}
            onContinue={continuePractice}
            onSolvedChange={setPracticeSolved}
          />
        )
      )}

      {currentPage > 0 && pages[currentPage] !== "practice" && (
        <NavigationArrows
          onBack={previousPage}
          onNext={nextPage}
        />
      )}
    </div>
  );
}

export default App;