import { alivaWebRTC } from "../index";

export const allFileSendSignal = function (fileName) {
  return new Promise((resolve, reject) => {
    try {
      const dataChannel = alivaWebRTC.dataChannels["dc"].dataChannel;
      const allFileSendSignal = {
        allFileSend: true,
        fileName,
      };
      dataChannel.send(JSON.stringify(allFileSendSignal));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
