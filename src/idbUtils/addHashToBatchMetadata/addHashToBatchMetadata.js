import { openDB } from "idb";

export const addHashToBatchMetadata = (fileName, batchKey, batchHash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);
      const key = "metadata";
      const fileMetadata = await db.get("fileMetadata", key);
      const { batchesMetaData } = fileMetadata;
      batchesMetaData[batchKey] = {
        ...batchesMetaData[batchKey],
        batchHash,
      };

      const value = {
        ...fileMetadata,
        batchesMetaData,
      };
      await db.put("fileMetadata", value, key);
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
