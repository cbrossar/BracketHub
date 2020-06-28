import React, { Component } from "react";
import { Button, Typography, Container } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import db from "../index";

const styles = {
  margin1: {
    marginBottom: "25px",
  },
  margin2: {
    marginBottom: "15px",
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    const gameCode = localStorage.getItem("gameCode");
    const userID = localStorage.getItem("userID");

    this.state = { gameCode: gameCode, userID: userID, joinLink: "join-game" };
  }

  componentDidMount() {
    // Create a reference to the games collection
    var gamesRef = db.collection("games");

    if (this.state.gameCode && this.state.userID) {
      gamesRef
        .doc(this.state.gameCode)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Found the doc");
            gamesRef
              .doc(this.state.gameCode)
              .collection("users")
              .doc(this.state.userID)
              .get()
              .then((user) => {
                if (user.exists) {
                  console.log("Found the user");
                  console.log(doc.data());

                  var joinLink = "join-game";
                  const gameStatus = doc.data().status;
                  if (gameStatus === "Lobby") {
                    joinLink = "lobby";
                  } else if (gameStatus === "Game Started") {
                    joinLink = "rounds";
                  }

                  this.setState({
                    joinLink: joinLink,
                  });
                } else {
                  console.log("No such document!");
                }
              })
              .catch(function (error) {
                console.log("Error getting document:", error);
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }

  render() {
    return (
      <Container maxWidth="md">
        <Typography variant="h2" align="center" style={styles.margin1}>
          Play the Bracket Game
        </Typography>
        <Typography varient="subtitle1" align="center" style={styles.margin1}>
          Endless possibilities
        </Typography>
        <Typography align="center" style={styles.margin2}>
          <Button color="primary" variant="contained" href="create-game">
            Create Game
          </Button>
        </Typography>
        <Typography align="center" style={styles.margin2}>
          <Button
            color="primary"
            variant="contained"
            href={this.state.joinLink}
          >
            Join Game
          </Button>
        </Typography>
        <Typography align="center" style={styles.margin2}>
          <Button href="how-to-play" startIcon={<InfoIcon />}>
            How To Play
          </Button>
        </Typography>
      </Container>
    );
  }
}

export default Home;
