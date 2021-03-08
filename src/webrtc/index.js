import { addWebrtcListener } from "./addWebrtcListener/addWebrtcListener";

import { initializeWebRTC } from "./initializeWebRTC/initializeWebRTC.js";

import { sendOffer } from "./sendOffer/sendOffer";

export const alivaWebRTC = {
  peerConnection: null,
  dataChannels: [],
  addWebrtcListener,
  initializeWebRTC,
  sendOffer,
};
