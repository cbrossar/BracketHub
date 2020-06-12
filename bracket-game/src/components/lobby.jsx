import React, { Component } from "react";
import { Container } from "@material-ui/core";
import firebase from "firebase";

class Lobby extends Component {
  constructor(props) {
    super(props);
    const gameCode = localStorage.getItem("gameCode");

    this.state = { gameCode: gameCode, gameName: "Test" };
  }

  componentDidMount() {
    var gameRef = firebase.database().ref("games/" + this.state.gameCode);
    gameRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({ gameName: snapshot.val().name });
      }
    });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h2>{this.state.gameName} Lobby</h2>
      </Container>
    );
  }
}

export default Lobby;
