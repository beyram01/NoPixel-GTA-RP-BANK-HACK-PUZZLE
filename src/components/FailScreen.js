import React, { useEffect, useContext } from "react";
import { modelContext } from "./Practice";
import { gameContext } from "./Game";
import Game from "../game_logic";

const FailScreen = ({ correctAnswers, playerAnswers }) => {
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
    <div className="fail__screen">
      <img src="./assets/failed.png" alt="" />
      <h2>THE SYSTEM DIDN'T ACCEPT YOUR ANSWERS</h2>
      <div className="btns">
        <button onClick={tryAgain}>Try Again</button>
        <button onClick={() => setStart(false)}>Exit</button>
      </div>
      <p className="comment">
        {playerAnswers.length > 0
          ? `Your answer is wrong: "${playerAnswers[0]} ${playerAnswers[1]}", The correct answer was: "${correctAnswers[0].answer} ${correctAnswers[1].answer}"`
          : `Your time ran out, The correct answer was: "${correctAnswers[0].answer} ${correctAnswers[1].answer}"`}
      </p>
    </div>
  );
};

export default FailScreen;
