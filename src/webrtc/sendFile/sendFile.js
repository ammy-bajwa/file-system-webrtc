export const sendFile = async ({ fileName, fileSize, batchesMetaData }) => {
  const batchesKeys = Object.keys(batchesMetaData);
  for (let key = 0; key < batchesKeys.length; key++) {
    const { chunks } = batchesKeys[key];
    console.log("chunks: ", chunks);
  }
};
