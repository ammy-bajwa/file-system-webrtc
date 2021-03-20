import { handleDirUpload } from "../../../dirUtils/upload/index";

import { alivaWebRTC } from "../../../webrtc/index";

export const onSubmit = async (event) => {
  event.preventDefault();
  const directoryUploaded = event.target.elements[0];
  //   await handleDirUpload(directoryUploaded, chunkSize, singleBatchSize);
  await handleDirUpload(directoryUploaded, alivaWebRTC.chunkSize, 2500);
};
