import React from "react";
import { Person } from "@material-ui/icons";
import {
  AcUnit,
  Adb,
  Audiotrack,
  BeachAccess,
  Camera,
  DirectionsBike,
  Eco,
  FitnessCenter,
  FlashOn,
  GolfCourse,
  LocalBar,
  NightsStay,
  OutdoorGrill,
  Reddit,
  Rowing,
  SmokingRooms,
  SportsSoccer,
  SportsCricket,
  Motorcycle,
} from "@material-ui/icons";
import {
  green,
  red,
  blue,
  purple,
  teal,
  amber,
  lime,
  cyan,
} from "@material-ui/core/colors";

const avatars = {
  ac_unit: <AcUnit />,
  adb: <Adb />,
  audiottrack: <Audiotrack />,
  beach_access: <BeachAccess />,
  camera: <Camera />,
  bike: <DirectionsBike />,
  eco: <Eco />,
  fitness: <FitnessCenter />,
  flash: <FlashOn />,
  golf: <GolfCourse />,
  drink: <LocalBar />,
  moon: <NightsStay />,
  grill: <OutdoorGrill />,
  reddit: <Reddit />,
  rowing: <Rowing />,
  smoke: <SmokingRooms />,
  soccer: <SportsSoccer />,
  cricket: <SportsCricket />,
};

const styles = {
  red: {
    backgroundColor: red[500],
  },
  green: {
    backgroundColor: green[500],
  },
  blue: {
    backgroundColor: blue[500],
  },
  purple: {
    backgroundColor: purple[500],
  },
  teal: {
    backgroundColor: teal[500],
  },
  amber: {
    backgroundColor: amber[500],
  },
  lime: {
    backgroundColor: lime[500],
  },
  cyan: {
    backgroundColor: cyan[500],
  },
};

function getRandomAvatar() {
  return getRandomKey(avatars);
}

function getRandomColor() {
  return getRandomKey(styles);
}

function getRandomKey(dict) {
  console.log(dict);
  const keys = Object.keys(dict);
  console.log(keys);
  const pos = Math.floor(Math.random() * keys.length);
  console.log(keys[pos]);
  return keys[pos];
}

export { avatars, getRandomAvatar, styles, getRandomColor };

function PlayerAvatar(props) {
  if (props.avatar in avatars) {
    return avatars[props.avatar];
  }
  return <Person />;
}

export default PlayerAvatar;
