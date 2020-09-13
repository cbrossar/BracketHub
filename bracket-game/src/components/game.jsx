import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";
import { storage } from "../index";
import Bracket from "./bracket";
import db from "../index";

const headerStyle = {
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  verticalAlign: "middle",
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
  width: "40%",
  margin: "5px 0px 5px 20%",
  marginLeft: "20%",
  textAlign: "center",
  display: "inline-block",
};

const boxStyle = {
  display: "flex",
};

const frameLStyle = {
  width: "40%",
  display: "inline-block",
  margin: "5px",
};

const frameRStyle = {
  width: "40%",
  display: "inline-block",
  margin: "5px",
  marginLeft: "20%",
  verticalAlign: "middle",
};

const helperStyle = {
  display: "inline-block",
  height: "100%",
  verticalAlign: "middle",
};

class Game extends Component {
  constructor() {
    super();
    const gameCode = localStorage.getItem("gameCode");

    this.state = {
      gameCode: gameCode,
      title: "",
      imageLeft: "",
      imageRight: "",
      turnPlayer: "",
      round: 0,
      turn: 0,
      images: [],
      users: [],
    };

    this.getImage("5WLCO0", "imageLeft");
    this.getImage("test3.png", "imageRight");
  }

  componentDidMount() {
    // Create a reference to the games collection
    var gamesRef = db.collection("games");

    gamesRef
      .doc(this.state.gameCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          this.setState({
            title: data.name + ": Round of " + data.rounds[data.round].length,
            round: data.round,
            turn: data.turn,
            images: data.rounds[data.round].images,
            users: data.rounds[data.round].users,
            turnPlayerName: data.rounds[data.round].users[data.turn],
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  getImage(image, side) {
    storage
      .ref()
      .child(`images/${image}`)
      .getDownloadURL()
      .then((url) => {
        if (side == "imageLeft") {
          this.setState({ imageLeft: url });
        } else {
          this.setState({ imageRight: url });
        }
      });
  }
  // set container based on screen size!
  render() {
    return (
      <Container maxWidth="md">
        <h1 style={headerStyle}>{this.state.title}</h1>
        <Bracket></Bracket>
        <div style={boxStyle}>
          <div style={frameLStyle}>
            <span style={helperStyle}></span>
            <img
              style={imageStyle}
              src={this.state.imageLeft}
              alt="image left"
            ></img>
          </div>
          <div style={frameRStyle}>
            <span style={helperStyle}></span>
            <img
              style={imageStyle}
              src={this.state.imageRight}
              alt="image right"
            ></img>
          </div>
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
