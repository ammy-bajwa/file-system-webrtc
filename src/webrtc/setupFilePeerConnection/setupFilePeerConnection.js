import { alivaWS } from "../../socket/index";

import { iceServers } from "../iceServers/iceServers";

import store from "../../redux/store";

import { addWebrtcListenerForFile } from "../addWebrtcListenerForFile/addWebrtcListenerForFile";

export const setupFilePeerConnection = function (fileName) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        fileReducer: { machineId },
      } = store.getState();

      const peerConnection = new RTCPeerConnection(iceServers);
      this.filesPeerConnections[fileName] = {
        peerConnection,
        dataChannels: {},
      };
      const { channel } = alivaWS;
      await addWebrtcListenerForFile(
        channel,
        machineId,
        peerConnection,
        fileName
      );

      peerConnection.ondatachannel = (event) => {
        const dataChannel = event.channel;
        const { label } = dataChannel;
        dataChannel.onopen = () => {
          console.log("File datachannel open");
          const dataChannelObj = {
            dataChannel,
          };
        };

        dataChannel.onerror = function (error) {
          console.log("Error:", error);
        };

        dataChannel.onmessage = async (event) => {
          const message = event.data;
        };
      };
      peerConnection.onnegotiationneeded = async () => {
        console.log("On negotiation called");
        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);
        channel.push("channel:sendOfferFilePC", {
          sender: machineId,
          offer: offer,
          fileName,
        });
        console.log("Offer sended");
      };

      peerConnection.onicecandidate = function (event) {
        if (event.candidate) {
          channel.push(`channel:sendIceFilePC`, {
            candidate: JSON.stringify(event.candidate),
            sender: machineId,
          });
        }
      };
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
