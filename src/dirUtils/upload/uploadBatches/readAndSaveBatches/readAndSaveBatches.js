import { addFileDataToChunks } from "../addFileDataToChunks/addFileDataToChunks";

import { saveBatchToIndexDB } from "../../../../idbUtils/saveBatchToIndexDB/saveBatchToIndexDB";

import { setStatus } from "../../../../status/status";

import { getHashOfBatch } from "../../../../fileUtils/getHashOfBatch/getHashOfBatch";

export const readAndSaveBatches = async (file, batchesMetaData) => {
  // Here we will get two things
  // file and metadata of filechunks
  for (const batchKey in batchesMetaData) {
    if (Object.hasOwnProperty.call(batchesMetaData, batchKey)) {
      const { chunks, endBatchCounter, fileName } = batchesMetaData[batchKey];
      const batchWithFileChunks = await addFileDataToChunks(file, chunks);
      const batchHash = await getHashOfBatch(batchWithFileChunks);
      // await addHashToBatchMetadata(fileName, batchKey, batchHash);
      debugger;
      const startSliceIndex = getLastChunkStartIndex(chunks);
      setStatus(
        `<h2>
        ${(startSliceIndex / 1000 / 1000).toFixed(
          2
        )} MB has been saved out of ${(file["size"] / 1000 / 1000).toFixed(
          2
        )} MB ${file["name"]} file
            </h2>`
      );
      // save batch to index db
      await saveBatchToIndexDB(file["name"], batchWithFileChunks);
    }
  }
};

const getLastChunkStartIndex = (chunks) => {
  const chunkKeys = Object.keys(chunks);
  const lastKey = chunkKeys[chunkKeys.length - 1];
  const { startSliceIndex } = chunks[lastKey];
  return startSliceIndex;
};
