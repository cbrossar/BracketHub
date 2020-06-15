import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core'
import { Grid, Button, Menu, MenuItem, Container, Select } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  option_title: {
    color: 'grey',
  },
  option: {
    marginBottom: theme.spacing(3),
  },
}));

function CreateGame() {
  const classes = useStyles();
  const [bracketSize, setBracketSize] = React.useState("16");
  const bracketSizes = ['4', '16', '32']
  const handleChange = (event) => {
    setBracketSize(event.target.value);
  };
  return (
    <Container maxWidth='md'>
      <Typography variant='h2' gutterBottom>Game Configuration</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
        <Typography variant='body1' className={classes.option_title}>Game Title:</Typography>
        <TextField required id="standard-required" className={classes.option} label="" defaultValue="Bracket Game" />
        </div>
        <div>
        <Typography variant='body1' className={classes.option_title}>Bracket Size:</Typography>
        <Select
          labelId="select-label"
          id="simple-select"
          value={bracketSize}
          onChange={handleChange}
          className={classes.option}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
        </Select>
        </div>
        <div>
        <Typography variant='body1' className={classes.option_title}>Add Optional Voting Categories</Typography>
        {/* put a grid element here: Name - votes per person - add button  */}
        <TextField className={classes.option} label="" defaultValue="Best hair" />
        </div>
        <div>
        <Button variant='contained' color="primary">Next Step</Button>
        </div>
        
      </form>
    </Container>
  );
}

export default CreateGame;
