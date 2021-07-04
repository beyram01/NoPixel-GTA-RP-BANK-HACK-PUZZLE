import React from "react";

const Rules = () => {
  return (
    <div className="rules__page">
      <h1>Rules</h1>
      <div className="content__container">
        <p>
          This is a logical reasoning test where you need to quickly connect the
          words, colors, and shapes.
        </p>
        <p>
          You will be given the numbers one to four in a random order, then you
          have eight seconds to answer two questions.
        </p>
        <img src="./assets/numbers-screen.png" alt="" />
        <p>
          See here how the numbers are connect to the images giving us the
          answer square orange.
        </p>
        <img src="./assets/puzzle-screen.png" alt="" />
        <p>There are Total: 7 questions / 7 colors / 4 shapes</p>
        <div className="puzzle__components">
          <div className="puzzle__colors">
            <h3>Colors</h3>
            <div>
              <p>BLACK</p>
              <span id="black"></span>
            </div>
            <div>
              <p>WHITE</p>
              <span id="white"></span>
            </div>
            <div>
              <p>GREEN</p>
              <span id="green"></span>
            </div>
            <div>
              <p>BLUE</p>
              <span id="blue"></span>
            </div>
            <div>
              <p>RED</p>
              <span id="red"></span>
            </div>
            <div>
              <p>YELLOW</p>
              <span id="yellow"></span>
            </div>
            <div>
              <p>PURPLE</p>
              <span id="purple"></span>
            </div>
          </div>
          <div className="puzzle__questions">
            <h3>Questions</h3>
            <p>BACKGROUND COLOR</p>
            <p>NUMBER COLOR</p>
            <p>SHAPE</p>
            <p>SHAPE COLOR</p>
            <p>COLOR TEXT</p>
            <p>TEXT BACKGROUND COLOR</p>
            <p>SHAPE TEXT</p>
          </div>
          <div className="puzzle__shapes">
            <h3>Shapes</h3>
            <p>RECTANGLE</p>
            <p>SQUARE</p>
            <p>TRIANGLE</p>
            <p>CIRCLE</p>
          </div>
        </div>
        <p>And here how to answer every question</p>
        <img src="./assets/questions.png" alt="" />
        <p>
          You can also change settings if you can’t keep up with the default
          one. I hope you like the hack* and Thank you for playing it.
        </p>
      </div>
    </div>
  );
};

export default Rules;
