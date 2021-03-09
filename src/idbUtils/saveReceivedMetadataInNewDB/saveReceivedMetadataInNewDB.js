import { openDB } from "idb";

export const saveReceivedMetadataInNewDB = (
  fileName,
  fileSize,
  batchesMetaData
) => {
  return new Promise(async (resolve, reject) => {
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
        fileName,
        fileSize,
        batchesMetaData,
        isReceived: true,
      };

      await db.add("fileMetadata", value, key);
      db.close();
      console.log("Alright");
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
