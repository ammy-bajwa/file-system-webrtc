import { alivaWebRTC } from "../index";

import { getBatchMetadata } from "../../idbUtils/getBatchMetadata/getBatchMetadata";

export const batchConfirmationMemory = function (
  fileName,
  batchHash,
  batchKey
) {
  return new Promise(async (resolve, reject) => {
    try {
      const inMemoryBatch = alivaWebRTC.chunks[fileName][batchHash];
      if (!inMemoryBatch) {
        console.log("alivaWebRTC: ", alivaWebRTC);
        debugger;
      }
      const batchMetadata = await getBatchMetadata(
        fileName,
        batchHash,
        batchKey
      );
      const inMemoryBatchChunksCount = Object.keys(inMemoryBatch).length;
      if (batchMetadata?.totalChunksCount === inMemoryBatchChunksCount) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
