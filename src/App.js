import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import DisplayFiles from "./components/displayFiles";

import "./App.css";
import { alivaWS } from "./socket/index";
import { onSubmit } from "./forms/folderUploadForm/onSubmit/onSubmit";
import { getAllSavedFiles } from "./idbUtils/getAllSavedFiles/getAllSavedFiles";
import { alivaWebRTC } from "./webrtc/index";

class App extends Component {
  state = {
    machineId: "",
    files: [],
    idbFiles: [],
  };
  async componentDidMount() {
    const machineId = uuidv4();
    await alivaWS.initializeSocket("ws://localhost:5000/socket");
    await alivaWebRTC.initializeWebRTC(alivaWS.channel, machineId);
    await alivaWebRTC.addWebrtcListener(
      alivaWS.channel,
      machineId,
      alivaWebRTC.peerConnection
    );
    const files = await getAllSavedFiles();
    this.setState({ machineId, idbFiles: files });
    console.log("files: ", files);
  }

  handleWebRtcConnection = async () => {
    const { machineId } = this.state;
    await alivaWebRTC.createDataChannel("dc");
  };

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

  handleFileChange = (event) => {
    const files = event.target.files;
    console.log("On change", files);
    if (files.length > 0) {
      this.setState({ files });
    }
  };
  render() {
    const { files, idbFiles } = this.state;
    return (
      <div>
        <div id="statusElement" className="text-center text-large text-info">
          <h1>Click to connect to WS</h1>
        </div>
        <div>
          <h2>Files Present In IDB</h2>
          <DisplayFiles files={idbFiles} />
          <button type="button" className="btn btn-outline-dark m-2">
            Sync Metadata
          </button>
        </div>
        <div>
          <h2>Uploaded Files Will Be Here</h2>
          <DisplayFiles files={files} />
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={this.handleWebRtcConnection}
          >
            Connect with webrtc
          </button>
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={this.handleWebRtcConnection}
          >
            Send Files Metadata
          </button>
          <button
            type="button"
            className="btn btn-dark m-2"
            onClick={this.cleanDBs}
          >
            Clean All DBs
          </button>
        </div>
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
