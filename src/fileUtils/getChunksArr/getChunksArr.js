export const getChunksArr = async (fileSize, chunkSize) => {
  const getChunksArrPromise = new Promise((resolve, reject) => {
    const numberOfArrayChunks = Math.floor(fileSize / chunkSize);
    const totalBaseChunksSize = numberOfArrayChunks * 40000;
    const lastChunkSize = fileSize - totalBaseChunksSize;
    let startSliceIndex = 0,
      endSliceIndex = chunkSize,
      chunksArr = [];
    for (let index = 0; index < numberOfArrayChunks; index++) {
      const chunkInfo = {
        startSliceIndex,
        endSliceIndex,
      };
      chunksArr.push(chunkInfo);
      startSliceIndex = endSliceIndex;
      endSliceIndex += chunkSize;
    }
    const lastChunkObj = {
      startSliceIndex: endSliceIndex,
      endSliceIndex: endSliceIndex + lastChunkSize,
    };
    chunksArr.push(lastChunkObj);
    resolve(chunksArr);
  });
  return await getChunksArrPromise;
};
