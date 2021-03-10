import { v4 as uuidv4 } from "uuid";

import { setStatus } from "../../status/status";

import { sendFile } from "../sendFile/sendFile";

export const createDataChannel = function (dataChannelName) {
  console.log("createDataChannel: ", this);
  return new Promise(async (resolve, reject) => {
    const dcOptions = {
      ordered: true,
      maxRetransmits: 10,
    };
    const dataChannel = await this.peerConnection.createDataChannel(
      dataChannelName,
      dcOptions
    );
    const webrtcObj = this;
    dataChannel.onopen = () => {
      console.log("datachannel is open");
      const dataChannelObj = {
        id: uuidv4(),
        dataChannel,
      };
      setStatus(`<h2>Webrtc connected</h2>`);
      webrtcObj.dataChannels[dataChannelName] = dataChannelObj;
      resolve(dataChannel);
    };

    dataChannel.onerror = function (error) {
      console.log("Error:", error);
      reject(error);
      setStatus("<h2>Webrtc disconnected</h2>");
    };

    dataChannel.onmessage = async (event) => {
      console.log("Got message", event.data);
      try {
        let receivedMessage = JSON.parse(event.data);
        if (receivedMessage.requestFile) {
          const { fileName } = receivedMessage;
          await sendFile(fileName);
        }
      } catch (error) {
        console.error(error);
      }
    };
  });
};
