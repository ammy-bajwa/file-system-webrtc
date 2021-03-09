import { openDB } from "idb";

export const saveFileMetadataInIndexedDB = async (
  file,
  fileName,
  fileSize,
  batchesMetaData
) => {
  const saveFileMetadataToIDBPromise = new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore("fileMetadata");
          db.createObjectStore("chunks");
        },
      });
      const key = "metadata";
      const value = {
        file,
        fileName,
        fileSize,
        batchesMetaData,
        isReceived: false,
      };

      await db.add("fileMetadata", value, key);
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
  return await saveFileMetadataToIDBPromise;
};
