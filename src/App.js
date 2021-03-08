import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { alivaWS } from "./socket/index";
// import { handleDirUpload } from "./dirUtils/upload/index";
import { onSubmit } from "./forms/folderUploadForm/onSubmit/onSubmit";

class App extends Component {
  state = {
    machineId: "",
    files: [],
  };
  async componentDidMount() {
    const machineId = uuidv4();
    this.setState({ machineId });
    await alivaWS.initializeSocket("ws://localhost:5000/socket");
  }

  cleanDBs = () => {
    window.indexedDB
      .databases()
      .then((r) => {
        for (var i = 0; i < r.length; i++)
          window.indexedDB.deleteDatabase(r[i].name);
      })
      .then(() => {
        alert("All data cleared.");
      });
  };
  render() {
    return (
      <div>
        <div id="statusElement" className="text-center text-large text-info">
          <h1>Click to connect to WS</h1>
        </div>
        <button
          type="button"
          className="btn btn-dark"
          // onClick={handleWebRtcConnection}
        >
          Connect with webrtc
        </button>
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={this.cleanDBs}
        >
          Clean All DBs
        </button>
        <form className="row mt-2" onSubmit={onSubmit}>
          <div className="col-auto">
            <input
              className="form-control-file form-control mb-1"
              type="file"
              // webkitdirectory=""
              // multiple=""
              onChange={this.handleFileChange}
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
