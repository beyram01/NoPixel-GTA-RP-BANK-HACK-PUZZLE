import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loading__screen">
      <audio src="./assets/assets_dialing.mp3" autoPlay></audio>
      <img src="./assets/hacker-man.png" />
      <h2>DOING SOME HACKER MAN STUFF</h2>
    </div>
  );
};

export default LoadingScreen;
