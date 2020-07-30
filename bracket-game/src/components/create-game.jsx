import React, { Component } from "react";
import db from "../index";
import { Grid, Button, Menu, MenuItem, Container, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import OptionalVoteList from "./optional-vote-list";

const useStyles = makeStyles((theme) => ({
  option_title: {
    color: "grey",
  },
  option: {
    marginBottom: theme.spacing(3),
  },
  allMargin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function CreateGame() {
  const classes = useStyles();
  const voteOptionRef = React.createRef();
  //useState hooks
  const [bracketSize, setBracketSize] = React.useState("16");
  const [gameName, setGameName] = React.useState("Bracket Game");
  const [voteOptions, setVoteOptions] = React.useState();
  //Event handlers
  const handleBracketChange = (event) => {
    setBracketSize(event.target.value);
  };
  const gameNameChange = (event) => {
    setGameName(event.target.value);
  };
  React.useEffect(() => {
    setVoteOptions(voteOptionRef.current.state.voteOptions);
  });
  const nextPageFunction = (event) => {
    var gameCode = genGameCode();
    //Create new game in db and add game options to it
    db.collection("games")
      .doc(gameCode)
      .set({
        name: gameName,
        bracketSize: bracketSize,
        //created_date: firebase.database.ServerValue.TIMESTAMP,
        status: "creating",
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    //Route to contestants page
    //log all options to console
    // console.log("Game Name: ", gameName);
    // console.log("Bracket Size: ", bracketSize);
    // console.log(voteOptions);
    // console.log("generatedCode: ", gameCode);
  };
  function genGameCode() {
    var code = Math.random().toString(36).substr(2, 5).toUpperCase();
    return code;
  }
  //Option elements
  const gameTitle = (
    <div>
      <Typography variant="body1" className={classes.option_title}>
        Game Title:
      </Typography>
      <TextField
        required
        id="standard-required"
        className={classes.option}
        label=""
        defaultValue="Bracket Game"
        onChange={gameNameChange}
      />
    </div>
  );
  const sizeDropdown = (
    <div>
      <Typography variant="body1" className={classes.option_title}>
        Bracket Size:
      </Typography>
      <Select
        labelId="select-label"
        id="simple-select"
        value={bracketSize}
        onChange={handleBracketChange}
        className={classes.option}
      >
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={32}>32</MenuItem>
      </Select>
    </div>
  );
  const nextPageButton = (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.allMargin}
        onClick={nextPageFunction}
      >
        Next Step
      </Button>
    </div>
  );
  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Game Configuration
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        {gameTitle}
        {sizeDropdown}
        <OptionalVoteList ref={voteOptionRef} />
        {nextPageButton}
      </form>
    </Container>
  );
}

export default CreateGame;
