import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDPcS-k8A25-VMN-yKlO2bfLmYdyTu08Mk",
  authDomain: "bracket-game.firebaseapp.com",
  databaseURL: "https://bracket-game.firebaseio.com",
  projectId: "bracket-game",
  storageBucket: "bracket-game.appspot.com",
  messagingSenderId: "928113672326",
  appId: "1:928113672326:web:e093a15e0f3f711bcd1107",
  measurementId: "G-E34PQCVZJ1",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var storage = firebase.storage();
export { storage };

export default db;

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
