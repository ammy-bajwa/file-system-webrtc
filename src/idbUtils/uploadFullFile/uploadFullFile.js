import { openDB } from "idb";

export const uploadFullFile = (fileHash, fileBlob) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = fileHash;
      const storeName = "blob";
      const key = "data";
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore(storeName);
        },
      });
      await db.put(storeName, fileBlob, key);
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
