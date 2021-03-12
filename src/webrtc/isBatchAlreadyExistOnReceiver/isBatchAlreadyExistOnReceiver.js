import { alivaWebRTC } from "../index";

export const isBatchAlreadyExistOnReceiver = (batchHash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataChannel = alivaWebRTC.dataChannels["dc"].dataChannel;
      dataChannel.onmessage = (event) => {
        const { isBatchExists } = JSON.parse(event.data);
        resolve(isBatchExists);
      };
      let batchExistsRequest = {
        isBatchExists: true,
        batchHash,
      };
      batchExistsRequest = JSON.stringify(batchExistsRequest);
      dataChannel.send(batchExistsRequest);
    } catch (error) {
      reject(error);
    }
  });
};
