import { addWebrtcListener } from "./addWebrtcListener/addWebrtcListener";
import { initializeWebRTC } from "./initializeWebRTC/initializeWebRTC.js";

export const alivaWebRTC = {
  peerConnection: null,
  dataChannels: [],
  addWebrtcListener,
  initializeWebRTC,
//   sendOffer,
};
