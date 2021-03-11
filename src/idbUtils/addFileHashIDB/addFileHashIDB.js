import { openDB } from "idb";

import { getHashOfData } from "../../fileUtils/getHashOfData/getHashOfData";

export const addFileHashIDB = (fileName, batchesHashes) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);
      const key = "metadata";
      const fileMetadata = await db.get("fileMetadata", key);
      const fileHash = await getHashOfData(batchesHashes);
      const value = {
        ...fileMetadata,
        fileHash,
      };
      await db.put("fileMetadata", value, key);
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
