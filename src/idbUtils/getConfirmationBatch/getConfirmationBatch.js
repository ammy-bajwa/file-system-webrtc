import { openDB } from "idb";

export const getConfirmationBatch = (fileName, batchKey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);
      const key = `metadata`;
      const fileMetadata = await db.get("fileMetadata", key);
      const batchMetadata = fileMetadata["batchesMetaData"][batchKey];
      db.close();
      resolve(batchMetadata);
    } catch (error) {
      reject(error);
    }
  });
};
