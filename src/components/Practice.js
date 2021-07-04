import React, { useState, useEffect } from "react";
import Game from "../game_logic";
import GameComponent from "./Game";

export const modelContext = React.createContext(null);

const Practice = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [puzzleAmount, setPuzzleAmount] = useState(4);
  const [numberOfRounds, setNumberOfRounds] = useState(4);
  const [puzzleTime, setPuzzleTime] = useState(8);
  const [puzzleData, setPuzzleData] = useState();
  const [start, setStart] = useState(false);

  useEffect(() => {
    const puzzleSettings = JSON.stringify({
      puzzleAmount,
      numberOfRounds,
      puzzleTime,
    });

    localStorage.setItem("puzzle_settings", puzzleSettings);
  }, []);

  const updateSettings = (key, newValue) => {
    let current_settings = JSON.parse(localStorage.getItem("puzzle_settings"));
    current_settings[key] = newValue;
    localStorage.setItem("puzzle_settings", JSON.stringify(current_settings));
  };

  const handleChange = (e) => {
    const target = e.target;
    if (target.name === "puzzleTime") {
      setPuzzleTime(target.value);
    } else if (target.name === "puzzleAmount") {
      setPuzzleAmount(target.value);
    } else {
      setNumberOfRounds(target.value);
    }
    updateSettings(target.name, target.value);
  };

  const startGame = () => {
    const currentGame = new Game();
    setPuzzleData(currentGame.puzzleData);
    setStart(true);
  };
  return (
    <>
      {windowWidth > 1050 ? (
        <modelContext.Provider value={{ start, setStart, setPuzzleData }}>
          {start && <GameComponent puzzleData={puzzleData} />}
          <div className="practice__page">
            <h2>Start Practicing Now</h2>
            <div className="settings__container">
              <div className="settings">
                <label htmlFor="puzzleAmount">Puzzle Amount</label>
                <select
                  name="puzzleAmount"
                  id="puzzleAmount"
                  value={puzzleAmount}
                  onChange={handleChange}
                >
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className="settings">
                <label htmlFor="numberOfRounds">Number of rounds</label>
                <select
                  name="numberOfRounds"
                  id="numberOfRounds"
                  value={numberOfRounds}
                  onChange={handleChange}
                >
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="settings">
                <label htmlFor="puzzleTime">
                  Puzzle Time <span>{puzzleTime}s</span>
                </label>
                <input
                  value={puzzleTime}
                  onChange={handleChange}
                  type="range"
                  name="puzzleTime"
                  id="puzzleTime"
                  min={5}
                  max={30}
                />
              </div>
            </div>
            <button onClick={startGame} id="start">
              Start
            </button>
          </div>
        </modelContext.Provider>
      ) : (
        <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
          Sorry you can start this only on desktop screens
        </h3>
      )}
    </>
  );
};

export default Practice;
