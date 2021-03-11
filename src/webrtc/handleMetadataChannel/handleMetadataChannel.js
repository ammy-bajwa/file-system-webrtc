import { checkIfAlreadyExist } from "../../idbUtils/checkIfAlreadyExist/checkIfAlreadyExist";

import { saveReceivedMetadata } from "../../idbUtils/saveReceivedMetadata/saveReceivedMetadata";

export const handleMetadataChannel = function (dataChannel) {
  dataChannel.onopen = () => {
    console.log("On metadata datachannel open");
  };

  dataChannel.onerror = function (error) {
    console.log("Error:", error);
  };

  dataChannel.onmessage = async (event) => {
    const message = event.data;
    try {
      const parsedMessage = JSON.parse(message);
      const {
        name,
        size,
        batchesMetaData,
        isReceived,
        fileHash,
      } = parsedMessage;
      await saveReceivedMetadata(name, size, batchesMetaData, fileHash);
      dataChannel.send(
        JSON.stringify({
          received: true,
        })
      );
    } catch (error) {
      console.error(error);
    }
    // We will parse the received message
    // extract fileName
    // Get metadata if already exist
    // Adding received metadata to received and save
  };
};
