import React, { Component } from "react";
import { Button } from "@material-ui/core";
import ImageUploader from "./image-uploader";
import db, { storage } from "../index";

class Contestants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestants: [],
      gameCode: localStorage.getItem("gameCode"),
      bracketSize: 0,
      imagesExist: false,
    };
  }

  componentDidMount() {
    console.log("COMPONENTDIDMOUNT RUNNNING");
    console.log(this.state.gameCode);
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

  initializeContestants(size) {
    // Check for existing image files first, if they exist fill in the names and set progress to 100 for those entries
    var new_contestants = [];
    for (var i = 0; i < size; i++) {
      var contestant = {
        index: i,
        name: "",
        filename: "",
        image: null,
        url_progress: 0,
      };
      new_contestants.push(contestant);
    }
    const dbRef = db
      .collection("games")
      .doc(this.state.gameCode)
      .collection("images");
    // Check if there are any images already in database
    try {
      console.log("In try block");
      //try to get images in gamecode doc
      dbRef.get().then((snap) => {
        console.log(snap.size);
        if (snap.size > 0) {
          console.log("Images exist");
          //if true fill in contestants, if not
          this.fillInContestants(new_contestants);
          // this.setState({ imagesExist: true }, () => {
          //   this.fillInContestants(new_contestants);
          // });
        } else {
          console.log("Images don't exist");
          for (var i = 0; i < size; i++) {
            db.collection("games")
              .doc(this.state.gameCode)
              .collection("images")
              .add({ filename: "", label: "", position: i });
          }
        }
      });
    } catch (error) {
      console.log("Error in images check" + error);
    }
    //If the images dont exist create the placeholders
    this.setState({ contestants: new_contestants });
    console.log(this.state.contestants);
  }

  fillInContestants(new_contestants) {
    const dbRef = db
      .collection("games")
      .doc(this.state.gameCode)
      .collection("images");
    dbRef
      .orderBy("position")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (doc.data().filename !== "") {
            var current_contestant = new_contestants[doc.data().position];
            current_contestant.name = doc.data().label;
            current_contestant.progress = 100;
            current_contestant.filename = doc.data().filename;
          }
        });
      });
  }

  upload(index) {
    // Given the image in state for this index, upload the image to the database
    console.log(this.state);
    const dbName = this.state.gameCode + index;
    const uploadTask = storage
      .ref(`images/${dbName}`)
      .put(this.state.contestants[index].image);
    // Put filename in state
    const state_contestants = this.state.contestants;
    state_contestants[index].filename = dbName;
    this.setState({ contestants: state_contestants });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //console.log(this.state);
        const state_contestants = this.state.contestants;
        state_contestants[index].url_progress = progress;
        this.setState({ contestants: state_contestants });
      },
      (error) => {
        // Error function ...
        console.log(error);
      }
    );
  }

  nextPage() {
    //Check if all image entries in contestants have a name and 100 progress
    //Then fill in images data with contestants data
    const dbRef = db
      .collection("games")
      .doc(this.state.gameCode)
      .collection("images");
    dbRef
      .orderBy("position")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const thisID = doc.id;
          var current_contestant = this.state.contestants[doc.data().position];
          var new_entries = {
            label: current_contestant.name,
            filename: current_contestant.filename,
          };
          dbRef.doc(thisID).update(new_entries);
        });
      });
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
