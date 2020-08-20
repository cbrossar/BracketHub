import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlayerAvatar from "./avatar";
import { styles } from "./avatar";
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
    paddingBottom: "15px",
  },
}));

const columnStyle = {
  height: "450px",
  // display: "flex",
  // flexDirection: "column",
  // flexWrap: "wrap",
  overflow: "auto",
};

export default function PlayerList(props) {
  const classes = useStyles();

  const players = [];

  props.players.forEach(function (player, index) {
    if (player) {
      players.push(
        <ListItem button key={index}>
          <ListItemAvatar>
            <Avatar style={styles[player.color]}>
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
      <List
        style={columnStyle}
        component="nav"
        aria-label="main mailbox folders"
      >
        {players}
      </List>
    </div>
  );
}
