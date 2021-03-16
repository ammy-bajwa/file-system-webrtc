import { openDB } from "idb";

export const saveBatchToIndexDB = async (batchHash, batcheBlob) => {
  const saveBatchToIndexDBPromise = new Promise(async (resolve, reject) => {
    try {
      const dbName = batchHash;
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore("blob");
        },
      });
      await db.put("blob", batcheBlob, "data");
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
  return await saveBatchToIndexDBPromise;
};
