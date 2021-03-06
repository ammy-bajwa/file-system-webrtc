export const getChunksArr = (fileSize, chunkSize) => {
  // chunkSize
  console.log(Math.ceil(fileSize / chunkSize));
};

getChunksArr(45245876, 40000);
