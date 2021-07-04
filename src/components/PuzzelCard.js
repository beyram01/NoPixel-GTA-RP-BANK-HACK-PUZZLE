import React from "react";

const PuzzelCard = ({ data }) => {
  const numberContainerStyle = {
    width: data.length === 4 ? "220px" : data.length === 5 ? "200px" : "180px",
    height: data.length === 4 ? "220px" : data.length === 5 ? "200px" : "180px",
  };
  const svgStyle = {
    fill: data.shapeColor,
  };
  return (
    <div
      className="background"
      style={{
        ...numberContainerStyle,
        backgroundColor: `var(--${data.backgroundColor})`,
      }}
    >
      {data.shape === "circle" ? (
        <svg
          viewBox="0 0 161 161"
          style={{ ...svgStyle, width: "90%", height: "90%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="80.5" cy="80.5" r="80.5" />
        </svg>
      ) : data.shape == "rectangle" ? (
        <svg
          viewBox="0 0 202 129"
          style={{ ...svgStyle, width: "95%", height: "75%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="202" height="129" />
        </svg>
      ) : data.shape == "triangle" ? (
        <svg
          viewBox="0 0 156 135"
          style={{ ...svgStyle, width: "100%", height: "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M78 0L155.942 135H0.0577164L78 0Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 179 179"
          style={{ ...svgStyle, width: "85%", height: "85%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="178.75" height="178.75" />
        </svg>
      )}
      <h3 className="textUp" style={{ color: data.textColor }}>
        {data.textUp}
      </h3>
      <h3 className="number" style={{ color: data.numberColor }}>
        {data.number}
      </h3>
      <h3 className="textDown" style={{ color: data.textColor }}>
        {data.textDown}
      </h3>
    </div>
  );
};

export default PuzzelCard;
