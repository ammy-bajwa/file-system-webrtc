import { openDB } from "idb";

export const loadBatchOfChunks = async (fileName, chunks) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);
      const chunksKeys = Object.keys(chunks);
      let fileChunksFromIDB = {};
      for (let index = 0; index < chunksKeys.length; index++) {
        const chunkKey = chunksKeys[index];
        const storedChunk = await db.get("chunks", chunkKey);
        fileChunksFromIDB[chunkKey] = storedChunk;
      }
      db.close();
      resolve(fileChunksFromIDB);
    } catch (error) {
      reject(error);
    }
  });
};
