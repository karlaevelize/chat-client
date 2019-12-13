import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { allMessages } from "./actions";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");
  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event test:", event.data);
      const action = JSON.parse(event.data);
      console.log("action test:", action);
      this.props.dispatch(action);
    };
  }
  render() {
    console.log("this.props.message-test:", this.props);
    const { messages } = this.props;
    const list = messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));
    return <div>{list}</div>;
  }
}

// get data from store

function mapStateToProps(state) {
  // state is the current data in the redux store
  // each property of the object becomes a props of the component
  return {
    messages: state //inside the component this.props.messages will be the entire state state of the redux store
  };
}

export default connect(mapStateToProps)(App);
