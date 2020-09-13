import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";
import ImageUploader from "./image-uploader";
import db, { storage } from "../index";

class Contestants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestants: [],
      gameCode: localStorage.getItem("gameCode"),
      bracketSize: 0,
    };
  }

  initializeContestants(size) {
    // Check for existing image files first
    // try {
    //   //try to get images in gamecode doc
    //   db.collection("games")
    //     .doc(this.state.gameCode)
    //     .collection("images")
    //     .get()
    //     .then((doc) => {
    //       console.log(doc.length());
    //     });
    // } catch (error) {}
    // Instantiate
    var new_contestants = [];
    for (var i = 0; i < size; i++) {
      var contestant = {
        index: i,
        name: "",
        image: null,
        url_progress: 0,
      };
      new_contestants.push(contestant);
      //I need to add a place holder in database for every contestant
      db.collection("games")
        .doc(this.state.gameCode)
        .collection("images")
        .add({ filename: "", label: "", position: i });
    }
    this.setState({ contestants: new_contestants });
  }

  upload(index) {
    // given the image in state for this index, upload the image to the database
    console.log(this.state);
    const dbName = this.state.gameCode + index;
    const uploadTask = storage
      .ref(`images/${dbName}`)
      .put(this.state.contestants[index].image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //console.log(this.state);
        const state_contestants = this.state.contestants;
        console.log(state_contestants);
        state_contestants[index].url_progress = progress;
        this.setState({ contestants: state_contestants });
      },
      (error) => {
        // Error function ...
        console.log(error);
      }
    );
  }

  componentDidMount() {
    // Retrieve bracketsize from firebase
    db.collection("games")
      .doc(this.state.gameCode)
      .get()
      .then((doc) => {
        this.setState({ bracketSize: doc.data().bracketSize });
        console.log(this.state.bracketSize);
        this.initializeContestants(this.state.bracketSize);
      });
  }
  nextPage() {
    //put all image info in the database.
    //pop a window for creater to write name then go to lobby
  }
  handleNameChange = (e, index) => {
    const state_contestants = this.state.contestants;
    state_contestants[index].label = e.target.value;
    this.setState({ contestants: state_contestants });
  };

  handleImageChange = (e, index) => {
    //update image in state
    console.log(index);
    if (e.target.files[0]) {
      const state_contestants = this.state.contestants;
      state_contestants[index].image = e.target.files[0];
      console.log(state_contestants);
      this.setState({ contestants: state_contestants }, this.upload(index));
    }
  };

  render() {
    return (
      <div>
        {this.state.contestants.map((uploader) => (
          <ImageUploader
            key={uploader.index}
            index={uploader.index}
            onImageChange={this.handleImageChange}
            onNameChange={this.handleNameChange}
            progress={uploader.url_progress}
          />
        ))}
        <Button>Next</Button>
      </div>
    );
  }
}
export default Contestants;
