import { openDB } from "idb";

export const saveFileMetadataInIndexedDB = async (
  file,
  fileName,
  fileSize,
  batchesMetaData,
  chunksArr
) => {
  const saveFileMetadataToIDBPromise = new Promise(async (resolve, reject) => {
    try {
      const db = await openDB(fileName, 1, {
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
        chunksArr,
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
