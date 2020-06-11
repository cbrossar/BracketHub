import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import InfoIcon from "@material-ui/icons/Info";

class Home extends Component {
  state = {};
  render() {
    return (
      <Container maxWidth="md">
        <Typography variant="h2" align="center">
          Play the Bracket Game
        </Typography>
        <Typography varient="subtitle1" align="center" gutterBottom>
          Endless possibilities
        </Typography>
        <Typography align="center" gutterBottom>
          <Button color="primary" variant="contained" href="create-game">
            Create Game
          </Button>
        </Typography>
        <Typography align="center" gutterBottom>
          <Button color="primary" variant="contained" href="join-game">
            Join Game
          </Button>
        </Typography>
        <Typography align="center" gutterBottom>
          <Button color="grey" href="how-to-play" startIcon={<InfoIcon />}>
            How To Play
          </Button>
        </Typography>
      </Container>
    );
  }
}

export default Home;
