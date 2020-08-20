import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";
import db from "../index";
import PlayerList from "./player-list";
import { CopyToClipboard } from "react-copy-to-clipboard";

const gameCodeStyle = {
  color: "#ad1457",
  padding: "0.2rem 0.4rem",
  borderRadius: "0.25rem",
  backgroundColor: "#f8bbd0",
};

class Lobby extends Component {
  constructor(props) {
    super(props);
    const gameCode = localStorage.getItem("gameCode");

    this.state = {
      gameCode: gameCode,
      title: "",
      players: [],
      copyText: "Copy Game Code",
    };
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
        <Button color="primary" variant="contained">
          Start Game
        </Button>
        <p>
          To invite your friends to join, have them use game code{" "}
          <code style={gameCodeStyle}>{this.state.gameCode}</code>
        </p>
        <CopyToClipboard
          text={this.state.gameCode}
          onCopy={() => {
            this.setState({ copyText: "Copied!" });
            setTimeout(() => {
              this.setState({ copyText: "Copy Game Code" });
            }, 2000);
          }}
        >
          <Button variant="outlined">{this.state.copyText}</Button>
        </CopyToClipboard>
      </Container>
    );
  }
}

export default Lobby;
