import React from "react";
import { Person } from "@material-ui/icons";
import avatars from "../js/avatars";

function PlayerAvatar(props) {
  if (props.avatar in avatars) {
    return avatars[props.avatar];
  }
  return <Person />;
}

export default PlayerAvatar;
