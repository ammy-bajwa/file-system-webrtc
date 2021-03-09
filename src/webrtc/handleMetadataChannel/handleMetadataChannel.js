import { checkIfAlreadyExist } from "../../idbUtils/checkIfAlreadyExist/checkIfAlreadyExist";

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
    //   saveReceivedFileMetadata();
    } catch (error) {}
    // We will parse the received message
    // extract fileName
    // Get metadata if already exist
    // Adding received metadata to received and save
  };
};
