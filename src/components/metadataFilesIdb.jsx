import { alivaWebRTC } from "../webrtc/index";

import { requestingFile } from "../webrtc/requestingFile/requestingFile";

import { setStatus } from "../status/status";

const MetadataFilesIdb = function ({ files }) {
  const requestFile = async (fileName) => {
    const dataChannelsCount = Object.keys(alivaWebRTC.dataChannels).length;
    setStatus("<h2>Setting up datachannels...</h2>");
    if (dataChannelsCount <= 0) {
      alert("Please connect webrtc");
      return;
    } else {
      await requestingFile(fileName);
    }
  };
  return (
    <div className="d-flex justify-content-center flex-wrap m-4">
      {files.length === 0 && <h3 className="text-info">No File</h3>}
      {files.map(
        (
          { name, size, isReceived, isOnlyMetadata, batchesMetaData, fileHash },
          i
        ) => (
          <div key={i}>
            {isReceived && isOnlyMetadata && (
              <div className="border border-dark rounded m-2 p-2">
                {name}--<b>{(size / 1000 / 1000).toFixed(2)}_MB</b>
                {isReceived && (
                  <button
                    type="button"
                    className="btn btn-dark m-2"
                    onClick={() => requestFile(name)}
                  >
                    Get File
                  </button>
                )}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default MetadataFilesIdb;