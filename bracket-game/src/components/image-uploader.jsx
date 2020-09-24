import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import { Grid, TextField } from "@material-ui/core";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      index: this.props.index,
    };
  }

  render() {
    const { onImageChange, onNameChange, index } = this.props;
    //console.log(index);
    return (
      <div>
        {this.state.index}
        <Grid container direction="row">
          <Grid item>
            <TextField
              //id={this.props.index.toString()}
              label="Contestant Name"
              onChange={(e) => onNameChange(e, this.props.index)}
            />
          </Grid>
          <Grid item>
            <input
              accept="image/*"
              id={index.toString()}
              type="file"
              onChange={(e) => onImageChange(e, this.state.index)}
              style={{ display: "none" }}
            />

            <label htmlFor={index.toString()}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Grid>
            {this.props.progress === 100 ? (
              <CheckIcon />
            ) : (
              <CircularProgress
                variant="static"
                size={48}
                value={this.props.progress}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default ImageUploader;
