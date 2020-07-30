import React, { Component } from "react";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import {
  Grid,
  MenuItem,
  Typography,
  Select,
  IconButton,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  option_title: {
    color: "grey",
  },
  option: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
class OptionalVoteList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    voteName: "",
    numberOfVotes: 1,
    voteOptions: [],
    showError: false,
    errorMessage: "That voting rule already exists",
  };
  voteOptionVotes = (event) => {
    this.setState({
      numberOfVotes: event.target.value,
    });
  };
  voteNameChange = (event) => {
    this.setState({
      voteName: event.target.value,
    });
  };

  addVoteOption = (event) => {
    if (!this.nameInVoteOptions(this.state.voteName)) {
      this.setState({ showError: false });
      var newOption = {
        name: this.state.voteName,
        votes: this.state.numberOfVotes,
      };
      var joined = this.state.voteOptions;
      joined.push(newOption);
      this.setState({ voteOptions: joined });
    } else {
      //display error
      this.setState({ showError: true });
    }
  };
  handleRemove(voteName) {
    console.log(voteName);
    var arrayLength = this.state.voteOptions.length;
    for (var i = 0; i < arrayLength; i++) {
      if (this.state.voteOptions[i].name === voteName) {
        console.log("Removing ", this.state.voteOptions[i].name);
        this.state.voteOptions.splice(i, 1);
        break;
      }
    }
    this.forceUpdate();
  }
  nameInVoteOptions(name) {
    //return true if name is in the vote options list
    var arrayLength = this.state.voteOptions.length;
    for (var i = 0; i < arrayLength; i++) {
      if (this.state.voteOptions[i].name === name) {
        return true;
      }
    }
    return false;
  }
  errorMessage = (
    <Grid item>
      <Typography
        variant="body2"
        color="secondary"
        style={useStyles.option_title}
      >
        {this.state.errorMessage}
      </Typography>
    </Grid>
  );
  render() {
    return (
      <div>
        <Accordion style={{ backgroundColor: "#E8E8E6" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" style={useStyles.option_title}>
              Add Optional Voting Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* put a grid element here: Name - votes per person - add button  */}
            <Grid container direction="column">
              {this.state.showError ? this.errorMessage : null}
              <Grid item container direction="row">
                <Grid item>
                  <TextField
                    className={useStyles.option}
                    label=""
                    placeholder="Best hair"
                    onChange={this.voteNameChange}
                  />
                </Grid>
                <Grid>
                  <Select
                    labelId="select-label"
                    label="Votes per game"
                    id="simple-select"
                    value={this.state.numberOfVotes}
                    onChange={this.voteOptionVotes}
                    className={useStyles.option}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    size="medium"
                    onClick={this.addVoteOption}
                  >
                    {" "}
                    <AddBoxOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>

              {this.state.voteOptions.map((display) => (
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  key={display.name}
                >
                  <Grid item>
                    <IconButton
                      key={display.name}
                      onClick={() => this.handleRemove(display.name)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    {" "}
                    <Typography
                      key={display.name}
                      value={display.name}
                      color="primary"
                    >
                      {display.name} : {display.votes}{" "}
                      {display.votes > 1 ? " votes " : " vote "}per game
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default OptionalVoteList;
