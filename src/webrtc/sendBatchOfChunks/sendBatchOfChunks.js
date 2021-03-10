import { alivaWebRTC } from "../index";

export const sendBatchOfChunks = async (batchOfChunksIDB) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allDataChannels = alivaWebRTC.dataChannels;
      const dataChannelsKeys = Object.keys(alivaWebRTC.dataChannels);
      let dataChannelsHelper = 0;
      for (const chunkKey in batchOfChunksIDB) {
        if (Object.hasOwnProperty.call(batchOfChunksIDB, chunkKey)) {
          const chunkToSend = batchOfChunksIDB[chunkKey];
          if (dataChannelsHelper >= dataChannelsKeys.length) {
            dataChannelsHelper = 0;
          }
          const dcKey = dataChannelsKeys[dataChannelsHelper];
          const { dataChannel } = allDataChannels[dcKey];
          dataChannel.send(JSON.stringify({ isChunk: true, chunkToSend }));
          dataChannelsHelper++;
        }
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
