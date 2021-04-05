// import { checkIfAlreadyExist } from "../../idbUtils/checkIfAlreadyExist/checkIfAlreadyExist";

import store from "../../redux/store";

import redux from "../../utils/manageRedux";

import { saveReceivedMetadata } from "../../idbUtils/saveReceivedMetadata/saveReceivedMetadata";

import { saveReceiveSubBatchdMetadata } from "../../idbUtils/saveReceiveSubBatchdMetadata/saveReceiveSubBatchdMetadata";

import { createBatchesDbs } from "../../idbUtils/createBatchesDbs/createBatchesDbs";

import { saveSmallFile } from "../../idbUtils/saveSmallFile/saveSmallFile";

export const handleMetadataChannel = function (dataChannel) {
  dataChannel.onopen = () => {
    console.log("On metadata datachannel open");
  };

  dataChannel.onerror = function (error) {
    console.log("Error:", error);
  };

  dataChannel.onmessage = async (event) => {
    const message = event.data;
    console.log("metadata message: ", message);
    try {
      const parsedMessage = JSON.parse(message);
      const { name, size, isReceived, fileHash } = parsedMessage;
      
      redux.saveReceivedSubBatchMetadataInState({
        name,
        size,
        subBatchesMetaData: parsedMessage.subBatchesMetaData,
        fileHash,
        isReceived,
        isOnlyMetadata: true,
      });
      await saveReceiveSubBatchdMetadata(name, parsedMessage);
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
