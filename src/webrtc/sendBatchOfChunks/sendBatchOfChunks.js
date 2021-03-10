export const sendBatchOfChunks = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
