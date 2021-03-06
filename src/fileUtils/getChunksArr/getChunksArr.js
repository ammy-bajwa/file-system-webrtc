export const getChunksArr = async (fileSize, chunkSize) => {
  const getChunksArrPromise = new Promise((resolve, reject) => {
    const numberOfArrayChunks = Math.ceil(fileSize / chunkSize);
    // chunkSize
    resolve(numberOfArrayChunks);
  });
  return await getChunksArrPromise;
};
