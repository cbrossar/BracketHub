import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink, blue } from "@material-ui/core/colors";
import PlayerAvatar from "./avatar";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  blue: {
    color: "#fff",
    backgroundColor: blue[500],
  },
}));

export default function PlayerList(props) {
  const classes = useStyles();

  const players = [];

  props.players.forEach(function (player, index) {
    if (player) {
      players.push(
        <ListItem button key={index}>
          <ListItemAvatar>
            <Avatar className={classes[player.color]}>
              <PlayerAvatar avatar={player.avatar} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={player.displayName} />
        </ListItem>
      );
    }
  });

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {players}
      </List>
    </div>
  );
}
