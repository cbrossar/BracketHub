import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import NameDialog from "./name-dialog";
import { Typography } from "@material-ui/core";
import db from "../index";

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
  body: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function JoinGame() {
  const classes = useStyles();

  const [gameCode, setGameCode] = React.useState("");
  const [errorGameCode, setErrorGameCode] = React.useState("");
  const [joinBtn, setJoinBtn] = React.useState(true);
  const [joinBtnText, setJoinBtnText] = React.useState("Join");
  const [joinBtnColor, setJoinBtnColor] = React.useState("primary");
  const [joinError, setJoinError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setJoinBtnText("Joining...");
    setJoinBtnColor("default");
    setJoinError(false);

    db.collection("games")
      .doc(gameCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          setOpen(true);
        } else {
          setJoinError(true);
          setErrorGameCode(gameCode);
          console.log("No such document!");
        }
        setJoinBtnText("Join");
        setJoinBtnColor("primary");
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveName = () => {
    setOpen(false);
    localStorage.setItem("gameCode", gameCode);
  };

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
    <Container maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        Enter Game Code
      </Typography>
      <Typography variant="body1" className={classes.body}>
        Capitalizaton does not matter.
      </Typography>
      <ErrorMessage
        error={joinError}
        classes={classes}
        gameCode={errorGameCode}
      />
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
          <Button
            disabled={joinBtn}
            variant="contained"
            color={joinBtnColor}
            onClick={handleClickOpen}
          >
            {joinBtnText}
          </Button>
        </div>
      </form>
      <NameDialog
        open={open}
        handleClose={handleClose}
        handleSaveName={handleSaveName}
      />
    </Container>
  );
}

function ErrorMessage(props) {
  if (props.error) {
    return (
      <Typography color="error" variant="body1" className={props.classes.body}>
        Error: Unable to find game with code '{props.gameCode}'
      </Typography>
    );
  } else {
    return <div></div>;
  }
}

export default JoinGame;
