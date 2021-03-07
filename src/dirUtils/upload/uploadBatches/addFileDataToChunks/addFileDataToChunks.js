import { getSpecificFileChunk } from "../../../../fileUtils/getSpecificFileChunk/getSpecificFileChunk";


export const addFileDataToChunks = async (file, chunks) => {
  const addFileDataToChunksPromise = new Promise(async (resolve, reject) => {
    try {
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
      resolve(batchWithFileChunks);
    } catch (error) {
      reject(error);
    }
  });
  return await addFileDataToChunksPromise;
};
