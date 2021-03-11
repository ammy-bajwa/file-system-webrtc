import { openDB } from "idb";

import { getConfirmationBatch } from "../getConfirmationBatch/getConfirmationBatch";

import { getHashOfData } from "../../fileUtils/getHashOfData/getHashOfData";

export const doConfirmationForBatch = (fileName, batchKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const confirmationBatch = await getConfirmationBatch(fileName, batchKey);
      const confirmationChunks = confirmationBatch["chunks"];
      const batchHash = confirmationBatch["batchHash"];
      let batchChunks = {};
      let missingChunks = {};
      let isMissing = false;
      const db = await openDB(dbName, 1);
      for (const chunkKey in confirmationChunks) {
        if (Object.hasOwnProperty.call(confirmationChunks, chunkKey)) {
          const { startSliceIndex, endSliceIndex } = confirmationChunks[
            chunkKey
          ];
          const key = `${startSliceIndex}__${endSliceIndex}`;
          const chunkData = await db.get("chunks", key);
          batchChunks[key] = chunkData;
          if (!chunkData) {
            missingChunks[key] = { key, fileName };
            isMissing = true;
          }
        }
      }
      const receivedBatchHash = await getHashOfData(batchChunks);
      if (batchHash !== receivedBatchHash) {
        reject(false);
      }
      db.close();
      resolve(missingChunks);
    } catch (error) {
      reject(error);
    }
  });
};
