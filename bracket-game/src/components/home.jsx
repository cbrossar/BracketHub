import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";

class Home extends Component {
  state = {};
  render() {
    return (
      <Container maxWidth="sm">
        <div>
          <Button color="primary" href="create-game">
            Create Game
          </Button>
        </div>
        <div>
          <Button color="primary" href="join-game">
            Join Game
          </Button>
        </div>
      </Container>
    );
  }
}

export default Home;
