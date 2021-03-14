import { alivaWebRTC } from "../index";

import { getBatchMetadata } from "../../idbUtils/getBatchMetadata/getBatchMetadata";

export const batchConfirmationMemory = function (batchHash) {
  return new Promise(async (resolve, reject) => {
    try {
      const inMemoryBatch = alivaWebRTC.chunks[batchHash];
      const batchMetadata = await getBatchMetadata(batchHash);
      let missingBatchChunks = [];
      for (const chunkKey in batchMetadata) {
        if (Object.hasOwnProperty.call(batchMetadata, chunkKey)) {
          const { startSliceIndex, endSliceIndex } = batchMetadata[chunkKey];
          const key = `${startSliceIndex}__${endSliceIndex}`;
          const isReceived = inMemoryBatch[key];
          if (!isReceived) {
            missingBatchChunks.push(key);
          }
        }
      }
      resolve(missingBatchChunks);
    } catch (error) {
      reject(error);
    }
  });
};
