import { addWebrtcListener } from "./addWebrtcListener/addWebrtcListener";

import { initializeWebRTC } from "./initializeWebRTC/initializeWebRTC.js";

import { sendOffer } from "./sendOffer/sendOffer";

import { createDataChannel } from "./createDataChannel/createDataChannel";

export const alivaWebRTC = {
  peerConnection: null,
  dataChannels: {},
  addWebrtcListener,
  initializeWebRTC,
  sendOffer,
  createDataChannel,
};
