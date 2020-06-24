import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { green, pink } from "@material-ui/core/colors";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

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
}));

export default function PlayerList(props) {
  const classes = useStyles();

  console.log("players list...");
  console.log("props: ", props);
  const players = [];

  props.players.forEach(function (player, index) {
    players.push(
      <ListItem button key={index}>
        <ListItemAvatar>{getAvatar(player.avatar)}</ListItemAvatar>

        <ListItemText primary={player.displayName} />
      </ListItem>
    );
  });

  function getAvatar(type) {
    if (type === "image") {
      return (
        <Avatar className={classes.pink}>
          <ImageIcon />
        </Avatar>
      );
    } else if (type === "work") {
      return (
        <Avatar className={classes.green}>
          <DraftsIcon />
        </Avatar>
      );
    } else {
      return (
        <Avatar>
          <InboxIcon />
        </Avatar>
      );
    }
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {players}
      </List>
    </div>
  );
}
