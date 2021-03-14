import { openDB } from "idb";

export const getBatchMetadata = function (batchHash) {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = batchHash;
      const storeName = "batchMetadata";
      const db = await openDB(dbName, 1);
      const batchMetadata = await db.getAll(storeName);
      const batchMetadataObj = {};
      for (let index = 0; index < batchMetadata.length; index++) {
        const { startSliceIndex, endSliceIndex } = batchMetadata[index];
        batchMetadataObj[`${startSliceIndex}__${endSliceIndex}`] = {
          startSliceIndex,
          endSliceIndex,
        };
      }
      db.close();
      resolve(batchMetadataObj);
    } catch (error) {
      reject(error);
    }
  });
};
