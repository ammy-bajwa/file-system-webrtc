import { openDB } from "idb";

export const loadBatchOfChunks = async (batchHash, fileName, chunks) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = batchHash;
      const storeName = "blob";
      const db = await openDB(dbName, 1);
      const chunksKeys = Object.keys(chunks);
      const storedBlob = await db.get(storeName, "data");
      let fileChunksFromIDB = {};
      let startBlobIndex = 0;
      let endBlobIndex = 0;
      for (let index = 0; index < chunksKeys.length; index++) {
        const chunkKey = chunksKeys[index];
        const { startSliceIndex, endSliceIndex } = chunks[chunkKey];
        const difference = endSliceIndex - startSliceIndex;
        endBlobIndex += difference;
        const blockChunk = storedBlob.slice(startBlobIndex, endBlobIndex);
        startBlobIndex = endBlobIndex;
        fileChunksFromIDB[chunkKey] = blockChunk;
      }
      db.close();
      resolve(fileChunksFromIDB);
    } catch (error) {
      reject(error);
    }
  });
};
