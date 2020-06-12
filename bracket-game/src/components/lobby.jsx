import React, { Component } from "react";
import { Container } from "@material-ui/core";
import firebase from "firebase";

class Lobby extends Component {
  constructor(props) {
    super(props);
    const gameCode = localStorage.getItem("gameCode");

    this.state = { gameCode: gameCode, title: "" };
  }

  componentDidMount() {
    var gameRef = firebase.database().ref("games/" + this.state.gameCode);
    gameRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({ title: snapshot.val().name + " Lobby" });
      }
    });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h2>{this.state.title}</h2>
      </Container>
    );
  }
}

export default Lobby;
