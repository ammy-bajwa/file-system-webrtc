import { alivaWebRTC } from "../index";

export const requestReceiverToSetupPC = function (fileNameToSend) {
  return new Promise(async (resolve, reject) => {
    try {
      const dcKeys = Object.keys(alivaWebRTC.dataChannels);
      const dataChannel = alivaWebRTC.dataChannels[dcKeys[0]].dataChannel;
      let senderCount = 0;
      dataChannel.onmessage = function (event) {
        const { setupPcRequest, fileName } = JSON.parse(event.data);
        if (setupPcRequest && fileName === fileNameToSend) {
          resolve(true);
        } else {
          if (senderCount > 4) {
            reject(false);
          } else {
            dataChannel.send(JSON.stringify(setupFilePcRequest));
            senderCount++;
          }
        }
      };
      const setupFilePcRequest = {
        setupPcRequest: true,
        fileName: fileNameToSend,
      };
      dataChannel.send(JSON.stringify(setupFilePcRequest));
    } catch (error) {
      reject(error);
    }
  });
};
