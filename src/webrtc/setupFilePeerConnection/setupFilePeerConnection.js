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
      const { channel } = alivaWS;
      await addWebrtcListenerForFile(
        channel,
        machineId,
        peerConnection,
        fileName
      );
      peerConnection.onnegotiationneeded = async () => {
        console.log("On negotiation called");
        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);
        // channel.push("channel:sendOfferFilePC", {
        //   sender: machineId,
        //   offer: offer,
        //   fileName,
        // });
        console.log("Offer sended");

        peerConnection.onicecandidate = function (event) {
          //   if (event.candidate) {
          //     channel.push(`channel:sendIceFilePC`, {
          //       candidate: JSON.stringify(event.candidate),
          //       sender: machineId,
          //     });
          //   }
        };
      };
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
