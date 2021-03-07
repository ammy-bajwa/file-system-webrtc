import { getSpecificFileChunk } from "../../../../fileUtils/getSpecificFileChunk/getSpecificFileChunk";

import { setStatus } from "../../../../status/status";

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
          setStatus(
            `<h2>
                ${(startSliceIndex / 1000 / 1000).toFixed(
                  2
                )} MB has been saved of ${file["name"]} file
            </h2>`
          );
        }
      }
      resolve(batchWithFileChunks);
    } catch (error) {
      reject(error);
    }
  });
  return await addFileDataToChunksPromise;
};
