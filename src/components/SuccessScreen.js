import React, { useEffect, useContext } from "react";
import { modelContext } from "./Practice";
import { gameContext } from "./Game";
import Game from "../game_logic";

const SuccessScreen = () => {
  const { setStart, setPuzzleData } = useContext(modelContext);
  const { setRound } = useContext(gameContext);

  useEffect(() => {
    localStorage.setItem("game_management", JSON.stringify([]));
  }, []);

  const tryAgain = () => {
    const game = new Game();
    setPuzzleData(game.puzzleData);
    setRound(1);
  };

  return (
    <div className="success__screen">
      <img src="./assets/hacker-man.png" alt="" />
      <h2>THE SYSTEM HAS BEEN BYPASSED.</h2>
      <div className="btns">
        <button onClick={tryAgain}>Try Again</button>
        <button onClick={() => setStart(false)}>Exit</button>
      </div>
    </div>
  );
};

export default SuccessScreen;
