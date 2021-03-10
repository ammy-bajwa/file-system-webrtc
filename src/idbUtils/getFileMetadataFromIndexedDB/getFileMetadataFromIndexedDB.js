import { openDB } from "idb";

export const getFileMetadataFromIndexedDB = (fileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);
      const fileMetadata = await db.get("fileMetadata", "metadata");
      db.close();
      resolve(fileMetadata);
    } catch (error) {
      reject(error);
    }
  });
};
