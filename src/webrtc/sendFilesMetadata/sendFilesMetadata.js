export const sendFilesMetadata = function (idbFiles, alivaWebRTC) {
  return new Promise(async (resolve, reject) => {
    const dataChannel = await alivaWebRTC.createDataChannel(
      "metadataDataChannel"
    );
    for (let index = 0; index < idbFiles.length; index++) {
      const { name, size, batchesMetaData } = idbFiles[index];

      if (size < 20000000) {
        dataChannel.send(
          JSON.stringify({
            name,
            size,
            batchesMetaData,
            isReceived: true,
          })
        );
      } else {
        const batchKeys = Object.keys(batchesMetaData);
        for (let index = 0; index < batchKeys.length; index++) {
          const batchKey = batchKeys[index];
          const batchInfo = {};
          batchInfo[batchKey] = batchesMetaData[batchKey];

          dataChannel.send(
            JSON.stringify({
              name,
              size,
              batchesMetaData: batchInfo,
              isReceived: true,
            })
          );
        }
      }
    }
    resolve(true);
  });
};
