import { addFileDataToChunks } from "../addFileDataToChunks/addFileDataToChunks";

import { saveBatchToIndexDB } from "../../../../idbUtils/saveBatchToIndexDB/saveBatchToIndexDB";

import { setStatus } from "../../../../status/status";

export const readAndSaveBatches = async (file, batchesMetaData) => {
  // Here we will get two things
  // file and metadata of filechunks
  for (const batchKey in batchesMetaData) {
    if (Object.hasOwnProperty.call(batchesMetaData, batchKey)) {
      const { chunks, endBatchCounter } = batchesMetaData[batchKey];
      const batchWithFileChunks = await addFileDataToChunks(file, chunks);
      // save batch to index db
      await saveBatchToIndexDB(file["name"], batchWithFileChunks);
      const startSliceIndex = getLastChunkStartIndex(chunks);
      setStatus(
        `<h2>
            ${(startSliceIndex / 1000 / 1000).toFixed(
              2
            )} MB has been saved of ${file["name"]} file
        </h2>`
      );
    }
  }
};

const getLastChunkStartIndex = (chunks) => {
  const chunkKeys = Object.keys(chunks);
  const lastKey = chunkKeys[chunkKeys.length - 1];
  const { startSliceIndex } = chunks[lastKey];
  return startSliceIndex;
};
