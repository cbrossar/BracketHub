import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";
import { storage } from "../index";
import Bracket from "./bracket";
import db from "../index";

const headerStyle = {
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  verticalAlign: "middle",
};

const voteLStyle = {
  width: "40%",
  marginTop: "5px",
};

const voteRStyle = {
  width: "40%",
  marginLeft: "20%",
  marginTop: "5px",
};

const labelLStyle = {
  width: "40%",
  margin: "5px 0px 5px 0px",
  textAlign: "center",
  display: "inline-block",
};

const labelRStyle = {
  width: "40%",
  margin: "5px 0px 5px 20%",
  marginLeft: "20%",
  textAlign: "center",
  display: "inline-block",
};

const boxStyle = {
  display: "flex",
};

const frameLStyle = {
  width: "40%",
  display: "inline-block",
  margin: "5px",
};

const frameRStyle = {
  width: "40%",
  display: "inline-block",
  margin: "5px",
  marginLeft: "20%",
  verticalAlign: "middle",
};

const helperStyle = {
  display: "inline-block",
  height: "100%",
  verticalAlign: "middle",
};

class Game extends Component {
  constructor() {
    super();
    const gameCode = localStorage.getItem("gameCode");

    this.state = {
      gameCode: gameCode,
      title: "",
      imageLeftURL: "",
      imageLeft: { label: "" },
      imageRight: { label: "" },
      imageRightURL: "",
      round: 0,
      turn: 0,
      match: 0,
      images: [],
      users: [],
      turnPlayerName: "",
    };
  }

  componentDidMount() {
    // Create a reference to the games collection
    var gamesRef = db.collection("games");

    gamesRef
      .doc(this.state.gameCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          this.setState({
            title:
              data.name + ": Round of " + data.rounds[data.round].images.length,
            round: data.round,
            turn: data.rounds[data.round].turn,
            images: data.rounds[data.round].images,
            users: data.rounds[data.round].users,
            turnPlayerName:
              data.rounds[data.round].users[data.rounds[data.round].turn],
            match: data.rounds[data.round].match,
          });
        } else {
          console.log("No such document!");
        }
        this.getImageDetails(
          doc,
          this.state.images[this.state.match * 2],
          "imageLeft"
        );
        this.getImageDetails(
          doc,
          this.state.images[this.state.match * 2 + 1],
          "imageRight"
        );
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  getImageDetails(doc, sub_doc_id, side) {
    doc.ref
      .collection("images")
      .doc(sub_doc_id)
      .get()
      .then((sub_doc) => {
        console.log(sub_doc.id, " => ", sub_doc.data());
        if (sub_doc.exists) {
          const data = sub_doc.data();
          this.setState({
            [side]: data,
          });
          this.downloadImage(data[["filename"]], side + "URL");

          console.log(this.state);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  downloadImage(image, side) {
    storage
      .ref()
      .child(`images/${image}`)
      .getDownloadURL()
      .then((url) => {
        this.setState({ [side]: url });
      });
  }

  // set container based on screen size!
  render() {
    const handleNext = () => {
      // db.collection("games")
      //   .doc(this.state.gameCode)
      //   .add({
      //     match: 1,
      //   })
      //   .then(function (docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      //     // localStorage.setItem("userID", docRef.id);
      //   })
      //   .catch(function (error) {
      //     console.error("Error writing document: ", error);
      //   });
    };

    console.log(this.state);
    return (
      <Container maxWidth="md">
        <h1 style={headerStyle}>{this.state.title}</h1>
        <Bracket turnPlayerName={this.state.turnPlayerName}></Bracket>
        <div style={boxStyle}>
          <div style={frameLStyle}>
            <span style={helperStyle}></span>
            <img
              style={imageStyle}
              src={this.state.imageLeftURL}
              alt="left"
            ></img>
          </div>
          <div style={frameRStyle}>
            <span style={helperStyle}></span>
            <img
              style={imageStyle}
              src={this.state.imageRightURL}
              alt="right"
            ></img>
          </div>
        </div>
        <div>
          <p style={labelLStyle}>{this.state.imageLeft.label}</p>
          <p style={labelRStyle}>{this.state.imageRight.label}</p>
        </div>
        <div>
          <Button style={voteLStyle} color="primary" variant="contained">
            Vote
          </Button>
          <Button style={voteRStyle} color="primary" variant="contained">
            Vote
          </Button>
        </div>
        <div style={{ paddingTop: "10px", paddingLeft: "800px" }}>
          <Button onClick={handleNext} color="primary" variant="contained">
            Next
          </Button>
        </div>
      </Container>
    );
  }
}

export default Game;
