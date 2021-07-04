import React from "react";

const NumbersScreen = ({ numbers }) => {
  const numberContainerStyle = {
    width:
      numbers.length === 4 ? "220px" : numbers.length === 5 ? "200px" : "180px",
    height:
      numbers.length === 4 ? "220px" : numbers.length === 5 ? "200px" : "180px",
  };
  return (
    <div className="numbers__screen">
      {numbers.map((num) => (
        <div
          key={num}
          className="number__container"
          style={numberContainerStyle}
        >
          <h3>{num}</h3>
        </div>
      ))}
    </div>
  );
};

export default NumbersScreen;
