import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";
import { storage } from "../index";

const headerStyle = {
  textAlign: "center",
};

const imageLStyle = {
  width: "40%",
  paddingTop: "15px",
};

const imageRStyle = {
  width: "40%",
  paddingLeft: "20%",
  paddingTop: "15px",
};

const voteLStyle = {
  width: "40%",
  marginTop: "5px",
};

const voteRStyle = {
  width: "40%",
  marginLeft: "20%",
  marginTop: "5px",
};

const labelLStyle = {
  width: "40%",
  margin: "5px 0px 5px 0px",
  textAlign: "center",
  display: "inline-block",
};

const labelRStyle = {
  //   float: "right",
  width: "40%",
  margin: "5px 0px 5px 20%",
  marginLeft: "20%",
  textAlign: "center",
  display: "inline-block",
};

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

class Game extends Component {
  constructor() {
    super();
    this.state = {
      test1: "",
      test4: "",
    };

    this.getImage("test1", "jpg");
    this.getImage("test4", "jpg");
  }

  getImage(image, extension) {
    storage
      .ref()
      .child(`images/${image}.${extension}`)
      .getDownloadURL()
      .then((url) => {
        this.state[image] = url;
        this.setState(this.state);
      });
  }
  // set container based on screen size!
  render() {
    return (
      <Container maxWidth="md">
        <h1 style={headerStyle}>Sexy King: Round of 16</h1>
        <div id="container" style={containStyle}>
          <svg style={svgStyle}>
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="black"
              stroke-width="3"
            />
            <line
              x1="50%"
              y1="50%"
              x2="25%"
              y2="50%"
              stroke="black"
              stroke-width="3"
            />
            <line
              x1="50%"
              y1="50%"
              x2="75%"
              y2="50%"
              stroke="black"
              stroke-width="3"
            />
            <line
              x1="25%"
              y1="50%"
              x2="25%"
              y2="100%"
              stroke="black"
              stroke-width="3"
            />
            <line
              x1="75%"
              y1="50%"
              x2="75%"
              y2="100%"
              stroke="black"
              stroke-width="3"
            />
          </svg>
          <p style={turnStyle}>Turn: Charlie</p>
        </div>

        <div>
          <img style={imageLStyle} src={this.state.test1} alt="test1"></img>
          <img style={imageRStyle} src={this.state.test4} alt="test2"></img>
        </div>
        <div>
          <p style={labelLStyle}>Machoke</p>
          <p style={labelRStyle}>Drake</p>
        </div>
        <div>
          <Button style={voteLStyle} color="primary" variant="contained">
            Vote
          </Button>
          <Button style={voteRStyle} color="primary" variant="contained">
            Vote
          </Button>
        </div>
      </Container>
    );
  }
}

export default Game;
