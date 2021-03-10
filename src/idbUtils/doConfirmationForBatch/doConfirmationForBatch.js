import { openDB } from "idb";

import { getConfirmationBatch } from "../getConfirmationBatch/getConfirmationBatch";

export const doConfirmationForBatch = (fileName, batchKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const confirmationBatch = await getConfirmationBatch(fileName, batchKey);
      const confirmationChunks = confirmationBatch["chunks"];
      let missingChunks = {};
      const db = await openDB(dbName, 1);
      for (const chunkKey in confirmationChunks) {
        if (Object.hasOwnProperty.call(confirmationChunks, chunkKey)) {
          const { startSliceIndex, endSliceIndex } = confirmationChunks[
            chunkKey
          ];
          const key = `${startSliceIndex}__${endSliceIndex}`;
          const chunkData = await db.get("chunks", key);
          if (!chunkData) {
            missingChunks[key] = { key, fileName };
          }
        }
      }
      db.close();
      resolve(missingChunks);
    } catch (error) {
      reject(error);
    }
  });
};
