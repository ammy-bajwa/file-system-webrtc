import { alivaWebRTC } from "../index";

import { getFileChunkFromIDB } from "../../idbUtils/getFileChunkFromIDB/getFileChunkFromIDB";

export const waitForBatchConfirmation = (fileName, batchKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataChannel = await alivaWebRTC.createDataChannel(
        "batchConfirmation"
      );
      let batchConfirmationPayload = {
        isConfirmation: true,
        batchKey,
        fileName,
      };
      batchConfirmationPayload = JSON.stringify(batchConfirmationPayload);
      dataChannel.onmessage = async (event) => {
        try {
          const { fileName, missingBatchChunks } = JSON.parse(event.data);
          console.log("Confirmation: ", { missingBatchChunks, fileName });
          for (const chunkKey in missingBatchChunks) {
            if (Object.hasOwnProperty.call(missingBatchChunks, chunkKey)) {
              const [startSliceIndex, endSliceIndex] = chunkKey.split("__");
              const getSpecificFileChunk = await getFileChunkFromIDB(
                fileName,
                startSliceIndex,
                endSliceIndex
              );
              dataChannel.send(JSON.stringify(getSpecificFileChunk));
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      dataChannel.send(batchConfirmationPayload);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
