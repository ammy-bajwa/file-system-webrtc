import { addFileDataToChunks } from "../addFileDataToChunks/addFileDataToChunks";

import { saveBatchToIndexDB } from "../../../../idbUtils/saveBatchToIndexDB/saveBatchToIndexDB";

import { setStatus } from "../../../../status/status";

import { getHashOfData } from "../../../../fileUtils/getHashOfData/getHashOfData";

import { addHashToBatchMetadata } from "../../../../idbUtils/addHashToBatchMetadata/addHashToBatchMetadata";

import { addFileHashIDB } from "../../../../idbUtils/addFileHashIDB/addFileHashIDB";

export const readAndSaveBatches = async (file, batchesMetaData) => {
  // Here we will get two things
  // file and metadata of filechunks
  let batchesHashes = [];
  for (const batchKey in batchesMetaData) {
    if (Object.hasOwnProperty.call(batchesMetaData, batchKey)) {
      const { chunks, endBatchCounter, fileName } = batchesMetaData[batchKey];
      const batchWithFileChunks = await addFileDataToChunks(file, chunks);
      const batchHash = await getHashOfData(batchWithFileChunks);
      console.log("batchWithFileChunks: ", batchWithFileChunks);
      batchesHashes.push(batchHash);

      await addHashToBatchMetadata(fileName, batchKey, batchHash);
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
      await saveBatchToIndexDB(batchHash, batchWithFileChunks);
    }
  }
  setStatus(`<h2>Adding hash to ${file["name"]} file</h2>`);
  await addFileHashIDB(file["name"], batchesHashes);
};

const getLastChunkStartIndex = (chunks) => {
  const chunkKeys = Object.keys(chunks);
  const lastKey = chunkKeys[chunkKeys.length - 1];
  const { startSliceIndex } = chunks[lastKey];
  return startSliceIndex;
};
