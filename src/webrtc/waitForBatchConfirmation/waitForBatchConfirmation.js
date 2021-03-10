import { alivaWebRTC } from "../index";

export const waitForBatchConfirmation = (fileName, batchKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataChannel = alivaWebRTC.dataChannels["dc"].dataChannel;
      let batchConfirmationPayload = {
        isConfirmation: true,
        batchKey,
        fileName,
      };
      batchConfirmationPayload = JSON.stringify(batchConfirmationPayload);
      dataChannel.onmessage = (event) => {
        console.log("Batch confimation", event.data);
      };
      dataChannel.send(batchConfirmationPayload);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
