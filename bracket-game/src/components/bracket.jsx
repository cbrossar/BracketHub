import React, { Component } from "react";

const svgStyle = {
  width: "100%",
  height: "50px",
};

const turnStyle = {
  position: "absolute",
  width: "150px",
  left: "50%",
  marginLeft: "-75px",
  top: "50%",
  textAlign: "center",
};

const containStyle = {
  position: "relative",
  width: "100%",
  height: "60px",
};

class Bracket extends Component {
  state = {};
  render() {
    return (
      <div id="container" style={containStyle}>
        <svg style={svgStyle}>
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="50%"
            stroke="black"
            strokeWidth="3"
          />
          <line
            x1="50%"
            y1="50%"
            x2="25%"
            y2="50%"
            stroke="black"
            strokeWidth="3"
          />
          <line
            x1="50%"
            y1="50%"
            x2="75%"
            y2="50%"
            stroke="black"
            strokeWidth="3"
          />
          <line
            x1="25%"
            y1="50%"
            x2="25%"
            y2="100%"
            stroke="black"
            strokeWidth="3"
          />
          <line
            x1="75%"
            y1="50%"
            x2="75%"
            y2="100%"
            stroke="black"
            strokeWidth="3"
          />
        </svg>
        <p style={turnStyle}>Turn: Charlie</p>
      </div>
    );
  }
}

export default Bracket;
