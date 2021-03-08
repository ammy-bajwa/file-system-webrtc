import { addWebrtcListener } from "./addWebrtcListener/addWebrtcListener";

export const alivaWebRTC = {
  peerConnection: null,
  dataChannels: [],
  addWebrtcListener,
  sendOffer,
};
