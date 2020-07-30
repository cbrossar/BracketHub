import React, { Component } from "react";
import { Container } from "@material-ui/core";
import db from "../index";
import PlayerList from "./player-list";

class Lobby extends Component {
  constructor(props) {
    super(props);
    const gameCode = localStorage.getItem("gameCode");

    this.state = { gameCode: gameCode, title: "", players: [] };
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
            title: data.name + " Lobby",
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    gamesRef
      .doc(this.state.gameCode)
      .collection("users")
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach(function (doc) {
          users.push(doc.data());
        });
        this.setState({
          players: users,
        });
      });
  }

  render() {
    return (
      <Container maxWidth="md">
        <h2>{this.state.title}</h2>
        <PlayerList players={this.state.players} />
      </Container>
    );
  }
}

export default Lobby;
