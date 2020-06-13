import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
}));

function NavBar() {
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link underline="none" className={classes.title} href="/">
              Bracket Game
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
