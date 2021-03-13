import { getSpecificFileChunk } from "../../../../fileUtils/getSpecificFileChunk/getSpecificFileChunk";

export const addFileDataToChunks = async (
  file,
  startBatchIndex,
  endBatchIndex
) => {
  const addFileDataToChunksPromise = new Promise(async (resolve, reject) => {
    try {
      // const batchWithFileChunks = {};
      const fileChunkObj = await getSpecificFileChunk(
        file,
        startBatchIndex,
        endBatchIndex
      );
      // for (const chunkey in chunks) {
      //   if (Object.hasOwnProperty.call(chunks, chunkey)) {
      //     const { startSliceIndex, endSliceIndex } = chunks[chunkey];
      //     const fileChunkObj = await getSpecificFileChunk(
      //       file,
      //       startSliceIndex,
      //       endSliceIndex
      //     );
      //     batchWithFileChunks[
      //       `${startSliceIndex}__${endSliceIndex}`
      //     ] = fileChunkObj;
      //   }
      // }
      // resolve(batchWithFileChunks);
      resolve(fileChunkObj);
    } catch (error) {
      reject(error);
    }
  });
  return await addFileDataToChunksPromise;
};
