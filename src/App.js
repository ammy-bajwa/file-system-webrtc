import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { alivaWS } from "./socket/index";
// import { handleDirUpload } from "./dirUtils/upload/index";
import { onSubmit } from "./forms/folderUploadForm/onSubmit/onSubmit";

class App extends Component {
  state = {
    machineId: uuidv4(),
  };
  async componentDidMount() {
    await alivaWS.initializeSocket("ws://localhost:5000/socket");
  }
  render() {
    return (
      <div>
        <h1 id="statusElement" className="text-center text-large text-info">
          Click to connect to WS
        </h1>
        <button
          type="button"
          className="btn btn-dark"
          // onClick={handleWebRtcConnection}
        >
          Connect with webrtc
        </button>
        <form className="row mt-2" onSubmit={onSubmit}>
          <div className="col-auto">
            <input
              className="form-control-file form-control mb-1"
              type="file"
              // webkitdirectory=""
              // multiple=""
              multiple
              required
            />
            <button className="btn btn-success" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
