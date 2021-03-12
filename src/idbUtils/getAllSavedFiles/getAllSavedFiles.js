import { openDB } from "idb";

export const getAllSavedFiles = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = "files";
      const db = await openDB(dbName, 1);
      const storeName = "filesMetadata";
      let files = await db.getAll(storeName);
      files = files.map(({ fileHash, fileName, fileSize, isReceived }) => {
        return {
          name: fileName,
          size: fileSize,
          fileHash,
          isReceived,
        };
      });
      resolve(files);
    } catch (error) {
      reject(error);
    }
  });
};
