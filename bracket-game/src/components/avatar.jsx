import React from "react";
import { Person } from "@material-ui/icons";
import { AcUnit, Adb, BeachAccess } from "@material-ui/icons";

const avatars = {
  ac_unit: <AcUnit />,
  adb: <Adb />,
  beach_access: <BeachAccess />,
};

function getRandomAvatar() {
  console.log(avatars);
  const keys = Object.keys(avatars);
  const pos = Math.floor(Math.random() * keys.length);
  return keys[pos];
}

export { avatars, getRandomAvatar };

function PlayerAvatar(props) {
  if (props.avatar in avatars) {
    return avatars[props.avatar];
  }
  return <Person />;
}

export default PlayerAvatar;
