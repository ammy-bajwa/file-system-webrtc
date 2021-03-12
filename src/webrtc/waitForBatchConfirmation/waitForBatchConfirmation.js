import { alivaWebRTC } from "../index";

import { getFileChunkFromIDB } from "../../idbUtils/getFileChunkFromIDB/getFileChunkFromIDB";

export const waitForBatchConfirmation = (fileName, batchKey, batchHash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataChannel = await alivaWebRTC.createDataChannel(
        "batchConfirmation"
      );
      let batchConfirmationPayload = {
        isConfirmation: true,
        batchKey,
        batchHash,
        fileName,
      };
      batchConfirmationPayload = JSON.stringify(batchConfirmationPayload);
      dataChannel.onmessage = async (event) => {
        try {
          const { batchHash, missingBatchChunks } = JSON.parse(event.data);
          console.log("Confirmation: ", { missingBatchChunks, batchHash });
          for (const chunkKey in missingBatchChunks) {
            if (Object.hasOwnProperty.call(missingBatchChunks, chunkKey)) {
              const [startSliceIndex, endSliceIndex] = chunkKey.split("__");
              const getSpecificFileChunk = await getFileChunkFromIDB(
                batchHash,
                startSliceIndex,
                endSliceIndex
              );
              console.log(
                `Resending ${startSliceIndex}__${endSliceIndex} chunk`
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
