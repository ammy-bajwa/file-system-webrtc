export const allFileSendSignal = function (fileName, dataChannel) {
  return new Promise((resolve, reject) => {
    try {
      const allFileSendSignal = {
        allFileSend: true,
        fileName,
      };
      dataChannel.send(JSON.stringify(allFileSendSignal));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
