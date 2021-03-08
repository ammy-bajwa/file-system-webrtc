import { initializeSocket } from "./initialization/initializeSocket";
import { addWebrtcListener } from "./webrtc/addWebrtcListener";

export const alivaWS = {
  socket: null,
  channel: null,
  initializeSocket,
  addWebrtcListener,
};
