import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import NumbersScreen from "./NumbersScreen";
import PuzzleScreen from "./PuzzleScreen";
import FailScreen from "./FailScreen";
import SuccessScreen from "./SuccessScreen";

export const gameContext = React.createContext("");

const delay = (time, callback) =>
  setTimeout(() => {
    callback();
  }, 1000 * time);

const Game = ({ puzzleData }) => {
  const [round, setRound] = useState(1);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [numbersScreen, setNumbersScreen] = useState(false);
  const [puzzleScreen, setPuzzleScreen] = useState(false);
  const [failScreen, setFailScreen] = useState(false);
  const [sccessScreen, setSuccessScreen] = useState(false);
  const [currentRoundData, setCurrentRoundData] = useState(
    puzzleData.filter((data) => data.round == round)[0]
  );
  const [answers, setAnswers] = useState([]);

  const settings = JSON.parse(localStorage.getItem("puzzle_settings"));

  const updateScreen = (
    loadingScreen,
    NumbersScreen,
    PuzzleScreen,
    FailScreen,
    successScreen
  ) => {
    setLoadingScreen(loadingScreen);
    setNumbersScreen(NumbersScreen);
    setPuzzleScreen(PuzzleScreen);
    setFailScreen(FailScreen);
    setSuccessScreen(successScreen);
  };

  useEffect(() => {
    localStorage.setItem("game_management", JSON.stringify([]));
  }, []);

  useEffect(() => {
    let initialDelay = round <= 1 ? 4 : 0;
    const roundM = {
      round: round,
      success: true,
    };
    setAnswers([]);
    const management = JSON.parse(localStorage.getItem("game_management"));
    if (management) {
      management.push(roundM);
      localStorage.setItem("game_management", JSON.stringify(management));
    } else {
      localStorage.setItem("game_management", JSON.stringify([roundM]));
    }
    setCurrentRoundData(puzzleData.filter((data) => data.round == round)[0]);
    if (round > Number.parseInt(settings.numberOfRounds)) {
      localStorage.removeItem("game_management");
      updateScreen(false, false, false, false, true);
      return;
    }
    if (round <= 1) {
      updateScreen(true, false, false, false);
    }
    delay(initialDelay, () => {
      updateScreen(false, true, false, false);
    });
    delay(initialDelay + 3, () => {
      updateScreen(false, false, true, false);
    });
    delay(initialDelay + 3 + Number.parseInt(settings.puzzleTime), () => {
      const success = JSON.parse(localStorage.getItem("game_management"));
      if (success.length == round) {
        localStorage.removeItem("game_management");
        updateScreen(false, false, false, true);
      }
    });
  }, [round, puzzleData]);

  return (
    <gameContext.Provider
      value={{ answers, setAnswers, round, setRound, updateScreen }}
    >
      <div className="puzzle">
        <div className="puzzle__panel">
          {/* Loading Screen - 4s */}
          {loadingScreen && <LoadingScreen />}
          {/* Show Numbers - 2s */}
          {numbersScreen && (
            <NumbersScreen numbers={currentRoundData.numbers} />
          )}
          {/* Start Playing */}
          {puzzleScreen && (
            <PuzzleScreen
              currentRoundData={currentRoundData}
              puzzleTime={settings.puzzleTime}
            />
          )}
          {/* Fail The Puzzle */}
          {failScreen && (
            <FailScreen
              correctAnswers={currentRoundData.answers}
              playerAnswers={answers}
            />
          )}
          {sccessScreen && <SuccessScreen />}
        </div>
      </div>
    </gameContext.Provider>
  );
};

export default Game;
