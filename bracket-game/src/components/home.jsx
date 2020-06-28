import React, { Component } from "react";
import { Button, Typography, Container } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

const styles = {
  margin1: {
    marginBottom: "25px",
  },
  margin2: {
    marginBottom: "15px",
  },
};

class Home extends Component {
  state = {};
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
          <Button color="primary" variant="contained" href="join-game">
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
