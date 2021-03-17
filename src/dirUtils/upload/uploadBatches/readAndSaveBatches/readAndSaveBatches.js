import { addFileDataToChunks } from "../addFileDataToChunks/addFileDataToChunks";

import { saveBatchToIndexDB } from "../../../../idbUtils/saveBatchToIndexDB/saveBatchToIndexDB";

import { setStatus } from "../../../../status/status";

import { getHashOfArraybuffer } from "../../../../fileUtils/getHashOfArraybuffer/getHashOfArraybuffer";

import { addHashToBatchMetadata } from "../../../../idbUtils/addHashToBatchMetadata/addHashToBatchMetadata";

import { addFileHashIDB } from "../../../../idbUtils/addFileHashIDB/addFileHashIDB";

export const readAndSaveBatches = async (file, batchesMetaData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Here we will get two things
      // file and metadata of filechunks
      let batchesHashes = [];
      for (const batchKey in batchesMetaData) {
        if (Object.hasOwnProperty.call(batchesMetaData, batchKey)) {
          const { startBatchIndex, endBatchIndex, fileName } = batchesMetaData[
            batchKey
          ];
          const batchWithFileData = await addFileDataToChunks(
            file,
            startBatchIndex,
            endBatchIndex
          );
          console.log(batchWithFileData);
          const batchArr = await batchWithFileData.arrayBuffer();
          const batchHash = await getHashOfArraybuffer(batchArr);
          batchesHashes.push(batchHash);
          await addHashToBatchMetadata(fileName, batchKey, batchHash);
          setStatus(
            `<h2>
          ${(endBatchIndex / 1000 / 1000).toFixed(
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
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const getLastChunkStartIndex = (chunks) => {
  const chunkKeys = Object.keys(chunks);
  const lastKey = chunkKeys[chunkKeys.length - 1];
  const { startSliceIndex } = chunks[lastKey];
  return startSliceIndex;
};
