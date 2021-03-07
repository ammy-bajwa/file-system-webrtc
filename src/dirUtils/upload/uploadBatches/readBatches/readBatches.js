import { getSpecificFileChunk } from "../../../../fileUtils/getSpecificFileChunk/getSpecificFileChunk";

export const readBatches = async (file, batchesMetaData) => {
  // Here we will get two things
  // file and metadata of filechunks
  for (const batchKey in batchesMetaData) {
    if (Object.hasOwnProperty.call(batchesMetaData, batchKey)) {
      const { chunks } = batchesMetaData[batchKey];
      const batchWithFileChunks = {};
      for (const chunkey in chunks) {
        if (Object.hasOwnProperty.call(chunks, chunkey)) {
          const { startSliceIndex, endSliceIndex } = chunks[chunkey];
          const fileChunkObj = await getSpecificFileChunk(
            file,
            startSliceIndex,
            endSliceIndex
          );
          batchWithFileChunks[
            `${startSliceIndex}__${endSliceIndex}`
          ] = fileChunkObj;
        }
      }
      console.log("batchWithFileChunks: ", batchWithFileChunks);
    }
  }
};
