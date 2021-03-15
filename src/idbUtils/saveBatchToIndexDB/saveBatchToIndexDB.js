import { openDB } from "idb";

export const saveBatchToIndexDB = async (
  batchHash,
  batcheBlob,
  chunksMetadata
) => {
  const saveBatchToIndexDBPromise = new Promise(async (resolve, reject) => {
    try {
      const dbName = batchHash;
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore("batchMetadata");
          db.createObjectStore("blob");
        },
      });
      console.log("batcheBlob: ", batcheBlob);
      for (const indexes in chunksMetadata) {
        if (Object.hasOwnProperty.call(chunksMetadata, indexes)) {
          const value = chunksMetadata[indexes];
          const { startSliceIndex, endSliceIndex } = value;
          const key = `${startSliceIndex}__${endSliceIndex}`;
          const valueOfChunkMetadata = {
            startSliceIndex,
            endSliceIndex,
          };
          await db.put("batchMetadata", valueOfChunkMetadata, key);
        }
      }
      // await db.put("blob", batcheBlob, "data");
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
  return await saveBatchToIndexDBPromise;
};
