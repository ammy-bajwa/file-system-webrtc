import { getFileMetadataFromIndexedDB } from "../../idbUtils/getFileMetadataFromIndexedDB/getFileMetadataFromIndexedDB";

export const sendFile = async (fileName) => {
  const fileMetadata = await getFileMetadataFromIndexedDB(fileName);
  const batchesMetadata = fileMetadata["batchesMetaData"];
  const batchesKeys = Object.keys(batchesMetadata);
  for (let key = 0; key < batchesKeys.length; key++) {
    const batchKey = batchesKeys[key];
    const { chunks } = batchesMetadata[batchKey];
    // We will send these batch of chunks to other peer
    console.log("chunks: ", chunks);
  }
};
