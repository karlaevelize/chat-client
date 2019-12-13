import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";
import "./App.css";

class App extends Component {
  state = {
    text: ""
  };

  stream = new EventSource("http://localhost:4000/stream");
  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event test:", event.data);
      const action = JSON.parse(event.data);
      console.log("action test:", action);
      this.props.dispatch(action);
    };
  }

  onChange = event => {
    // const value = event.target.value
    // const {value} = event.target
    // const {target} = event
    // const {value} = target
    const {
      target: { value }
    } = event;

    this.setState({ text: value });
  };

  onClick = () => {
    this.setState({ text: "" });
  };

  onSubmit = async event => {
    event.preventDefault();
    const url = "http://localhost:4000/message";
    const response = await superagent.post(url).send(this.state);
    console.log("response test:", response);
    this.onClick();
  };

  render() {
    console.log("this.props.message-test:", this.props);
    const { messages } = this.props;
    const list = messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} type="text" value={this.state.text} />
          <button>Submit</button>
        </form>
        <br />
        <button onClick={this.onClick}>Reset Form</button>
        {list}
      </main>
    );
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
