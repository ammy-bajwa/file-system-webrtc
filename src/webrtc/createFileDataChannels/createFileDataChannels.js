import { v4 as uuidv4 } from "uuid";

export const createFileDataChannels = function (dcName) {
  return new Promise(async (resolve, reject) => {
    try {
      const webrtcObj = this;
      const dcOptions = {
        ordered: true,
        maxRetransmits: 10,
      };
      const dataChannel = await this.peerConnection.createDataChannel(
        dcName,
        dcOptions
      );

      dataChannel.onopen = () => {
        console.log("datachannel is open");
        const dataChannelObj = {
          id: uuidv4(),
          dataChannel,
        };
        webrtcObj.dataChannels[dcName] = dataChannelObj;
        resolve(dataChannel);
      };

      dataChannel.onerror = function (error) {
        console.log("Error:", error);
        reject(error);
      };

      dataChannel.onmessage = async (event) => {
        console.log("Got message", event.data);
      };
    } catch (error) {
      reject(error);
    }
  });
};
