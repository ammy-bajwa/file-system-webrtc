import { openDB, deleteDB } from "idb";

export const checkIfAlreadyExist = (dbName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isAlreadyExist = true;
      const db = await openDB(dbName, 1);
      const batchMetadata = await db.getAll("batchMetadata");
      for (let index = 0; index < batchMetadata.length; index++) {
        const { startSliceIndex, endSliceIndex } = batchMetadata[index];
        const key = `${startSliceIndex}__${endSliceIndex}`;
        const isChunkExist = await db.get("chunks", key);
        if (!isChunkExist) {
          isAlreadyExist = false;
        }
      }
      db.close();
      resolve(isAlreadyExist);
    } catch (error) {
      reject(error);
    }
  });
};
