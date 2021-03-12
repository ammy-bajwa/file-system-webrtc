import { openDB } from "idb";

export const saveBatchToIndexDB = async (batchHash, batche) => {
  const saveBatchToIndexDBPromise = new Promise(async (resolve, reject) => {
    try {
      const dbName = batchHash;
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore("batchMetadata");
          db.createObjectStore("chunks");
        },
      });

      for (const indexes in batche) {
        if (Object.hasOwnProperty.call(batche, indexes)) {
          const value = batche[indexes];
          const { startSliceIndex, endSliceIndex } = value;
          const key = `${startSliceIndex}__${endSliceIndex}`;
          const valueOfChunkMetadata = {
            startSliceIndex,
            endSliceIndex,
          };
          await db.put("batchMetadata", valueOfChunkMetadata, key);
          await db.put("chunks", value, key);
        }
      }
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
  return await saveBatchToIndexDBPromise;
};
