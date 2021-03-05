import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { alivaWS } from "./socket/index";
import { render } from "@testing-library/react";

class App extends Component {
  async componentDidMount() {
    await alivaWS.initializeSocket("ws://localhost:4000/socket");
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
