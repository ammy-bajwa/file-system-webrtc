import { v4 as uuidv4 } from "uuid";

export const createDataChannel = function (dataChannelName) {
  console.log("createDataChannel: ", this);
  return new Promise(async (resolve, reject) => {
    const dataChannel = await this.peerConnection.createDataChannel(
      dataChannelName
    );
    const webrtcObj = this;
    dataChannel.onopen = () => {
      console.log("datachannel is open");
      const dataChannelObj = {
        id: uuidv4(),
        dataChannel,
      };
      webrtcObj.dataChannels[dataChannelName] = dataChannelObj;
      resolve(dataChannel);
    };

    dataChannel.onerror = function (error) {
      console.log("Error:", error);
      reject(error);
    };

    dataChannel.onmessage = async (event) => {
      console.log("Got message", event.data);
    };
  });
};
