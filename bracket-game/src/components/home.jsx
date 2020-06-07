import React, { Component } from "react";
import { Button } from "@material-ui/core";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Home;
