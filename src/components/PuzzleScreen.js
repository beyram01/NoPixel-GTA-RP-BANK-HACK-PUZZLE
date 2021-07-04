import React, { useState, useEffect, useRef, useContext } from "react";
import PuzzleCard from "./PuzzelCard";
import { gameContext } from "./Game";

const PuzzleScreen = ({ currentRoundData, puzzleTime }) => {
  const [answer, setAnswer] = useState("");
  const answerRef = useRef(null);

  const { setAnswers, round, setRound, updateScreen } = useContext(gameContext);

  useEffect(() => {
    answerRef.current.focus();
  }, []);

  const sendAnswers = (e) => {
    e.preventDefault();
    const playerAnswers = answer.split(" ");
    setAnswers(playerAnswers);
    if (
      playerAnswers[0] === currentRoundData.answers[0].answer &&
      playerAnswers[1] === currentRoundData.answers[1].answer
    ) {
      return setRound(round + 1);
    }
    localStorage.removeItem("game_management");
    updateScreen(false, false, false, true);
  };

  return (
    <div className="puzzle__screen">
      <div className="card__container">
        {currentRoundData.data.map((data) => {
          return <PuzzleCard key={data.id} data={data} />;
        })}
      </div>
      <div className="timer__container">
        <div
          className="timer"
          style={{ animation: `timer ${puzzleTime}s linear forwards` }}
        ></div>
      </div>
      <h3 className="question">
        {`${currentRoundData.questions[0].qt}(${currentRoundData.questions[0].card}) and ${currentRoundData.questions[1].qt}(${currentRoundData.questions[1].card})`}
      </h3>
      <form onSubmit={sendAnswers}>
        <label htmlFor="answer">Answer</label>
        <input
          ref={answerRef}
          type="text"
          name="answer"
          id="answer"
          value={answer}
          placeholder="purple rectangle"
          onChange={(e) => setAnswer(e.target.value)}
        />
      </form>
      <audio src="./assets/long-metronome.mp3" autoPlay></audio>
    </div>
  );
};

export default PuzzleScreen;
