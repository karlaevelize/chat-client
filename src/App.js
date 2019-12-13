import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");
  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event test:", event.data);
      const parsed = JSON.parse(event.data);
      console.log("parse test:", parsed);
    };
  }
  render() {
    return <div>Client</div>;
  }
}

export default App;
