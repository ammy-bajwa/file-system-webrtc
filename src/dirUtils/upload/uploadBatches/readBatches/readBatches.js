import { addFileDataToChunks } from "../addFileDataToChunks/addFileDataToChunks";

export const readBatches = async (file, batchesMetaData) => {
  // Here we will get two things
  // file and metadata of filechunks
  for (const batchKey in batchesMetaData) {
    if (Object.hasOwnProperty.call(batchesMetaData, batchKey)) {
      const { chunks } = batchesMetaData[batchKey];
      const batchWithFileChunks = await addFileDataToChunks(file, chunks);
      // save batch to index db
      console.log("batchWithFileChunks: ", batchWithFileChunks);
    }
  }
};
