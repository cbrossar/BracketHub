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
    db.collection("games")
      .doc(this.state.gameCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
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

    db.collection("users")
      .orderBy("games." + this.state.gameCode)
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach(function (doc) {
          users.push(doc.data());
        });
        this.setState({
          players: users,
        });
        console.log("Current cities in CA: ", users.join(", "));
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
