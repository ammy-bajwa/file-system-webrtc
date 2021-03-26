import { alivaWebRTC } from "../index";

export const cleanFilePeerConnection = function (fileName) {
  return new Promise(async (resolve, reject) => {
    try {
      const filePc = alivaWebRTC.filesPeerConnections[fileName].peerConnection;
      await filePc.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
