import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { alivaWS } from "./socket/index";

class App extends Component {
  state = {
    status: "Click to connect to ws",
    machineId: uuidv4(),
  };
  async componentDidMount() {
    await alivaWS.initializeSocket("ws://localhost:5000/socket");
  }
  render() {
    const { status } = this.state;
    return (
      <div>
        <h1 className="text-center text-info">{status}</h1>
        {/* <button
          type="button"
          className="btn btn-dark"
          onClick={handleWebRtcConnection}
        >
          Connect with webrtc
        </button> */}
        <form>
          <input type="file" webkitdirectory="" multiple="" required />
        </form>
      </div>
    );
  }
}

export default App;
