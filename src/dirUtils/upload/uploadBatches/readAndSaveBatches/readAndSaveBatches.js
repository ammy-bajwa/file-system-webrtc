import { addFileDataToChunks } from "../addFileDataToChunks/addFileDataToChunks";

import { saveBatchToIndexDB } from "../../../../idbUtils/saveBatchToIndexDB/saveBatchToIndexDB";

import { setStatus } from "../../../../status/status";

import { getHashOfArraybuffer } from "../../../../fileUtils/getHashOfArraybuffer/getHashOfArraybuffer";

import { addHashToBatchMetadata } from "../../../../idbUtils/addHashToBatchMetadata/addHashToBatchMetadata";

import { addFileHashIDB } from "../../../../idbUtils/addFileHashIDB/addFileHashIDB";

export const readAndSaveBatches = async (file, batchesMetaData) => {
  // Here we will get two things
  // file and metadata of filechunks
  let batchesHashes = [];
  for (const batchKey in batchesMetaData) {
    if (Object.hasOwnProperty.call(batchesMetaData, batchKey)) {
      const {
        startBatchIndex,
        endBatchIndex,
        chunks,
        // endBatchCounter,
        fileName,
      } = batchesMetaData[batchKey];
      const batchWithFileData = await addFileDataToChunks(
        file,
        startBatchIndex,
        endBatchIndex
      );
      const batchArr = await batchWithFileData.arrayBuffer();
      const batchHash = await getHashOfArraybuffer(batchArr);
      batchesHashes.push(batchHash);

      console.log("batchHash: ", batchHash);

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
      await saveBatchToIndexDB(batchHash, batchWithFileData);
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
