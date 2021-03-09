import { checkIfAlreadyExist } from "../../idbUtils/checkIfAlreadyExist/checkIfAlreadyExist";

import { saveReceivedMetadataInNewDB } from "../../idbUtils/saveReceivedMetadataInNewDB/saveReceivedMetadataInNewDB";

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
      const { name, size, batchesMetaData, isReceived } = parsedMessage;
      const isAlreadyExist = await checkIfAlreadyExist(name);
      console.log("parsedMessage: ", parsedMessage);
      console.log("isAlreadyExist: ", isAlreadyExist);
      if (isAlreadyExist) {
        // Save metadata info to already existed db
      } else {
        // Save metadata info to new db
        await saveReceivedMetadataInNewDB(name, size, batchesMetaData);
      }
      //   saveReceivedFileMetadata();
    } catch (error) {}
    // We will parse the received message
    // extract fileName
    // Get metadata if already exist
    // Adding received metadata to received and save
  };
};
