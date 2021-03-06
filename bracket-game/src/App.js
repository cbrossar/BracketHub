import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/navbar";
import CreateGame from "./components/create-game";
import JoinGame from "./components/join-game";
import Lobby from "./components/lobby";
import Game from "./components/game";
import HowToPlay from "./components/how-to-play";
import Contestants from "./components/contestants";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <div className="page">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/create-game">
                <CreateGame />
              </Route>
              <Route path="/join-game">
                <JoinGame />
              </Route>
              <Route path="/how-to-play">
                <HowToPlay />
              </Route>
              <Route path="/lobby">
                <Lobby />
              </Route>
              <Route path="/contestants">
                <Contestants />
              </Route>
              <Route path="/game">
                <Game />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
