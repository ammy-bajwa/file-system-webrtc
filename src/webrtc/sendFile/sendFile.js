import { getFileMetadataFromIndexedDB } from "../../idbUtils/getFileMetadataFromIndexedDB/getFileMetadataFromIndexedDB";

import { loadBatchOfChunks } from "../../idbUtils/loadBatchOfChunks/loadBatchOfChunks";

export const sendFile = async (fileName) => {
  const fileMetadata = await getFileMetadataFromIndexedDB(fileName);
  const batchesMetadata = fileMetadata["batchesMetaData"];
  const batchesKeys = Object.keys(batchesMetadata);
  for (let key = 0; key < batchesKeys.length; key++) {
    const batchKey = batchesKeys[key];
    const { chunks } = batchesMetadata[batchKey];
    // We will send these batch of chunks to other peer
    const batchOfChunksIDB = await loadBatchOfChunks(fileName, chunks);
    console.log("batchOfChunksIDB: ", batchOfChunksIDB);
  }
};
