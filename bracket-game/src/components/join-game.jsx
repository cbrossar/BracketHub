import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

function JoinGame() {
  const classes = useStyles();

  const [gameCode, setGameCode] = React.useState("");
  const [joinBtn, setJoinBtn] = React.useState(true);

  const handleChange = (prop) => (event) => {
    setGameCode(event.target.value.toUpperCase());

    if (event.target.value.length === 5) {
      setJoinBtn(false);
    } else {
      setJoinBtn(true);
    }
  };

  // Todo: add error handling
  return (
    <div>
      <h1>Enter Game Code</h1>
      <p>Capitalizaton does not matter.</p>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            variant="filled"
            label="Game Code"
            value={gameCode}
            onChange={handleChange("gameCode")}
          />
        </div>
        <div className={classes.button}>
          <Button disabled={joinBtn} variant="contained" color="primary">
            Join
          </Button>
        </div>
      </form>
    </div>
  );
}

export default JoinGame;
