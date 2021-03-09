export const sendFilesMetadata = function (idbFiles, alivaWebRTC) {
  return new Promise(async (resolve, reject) => {
    const dataChannel = await alivaWebRTC.createDataChannel(
      "metadataDataChannel"
    );
    for (let index = 0; index < idbFiles.length; index++) {
      const { name, size, batchesMetaData } = idbFiles[index];
      dataChannel.send(
        JSON.stringify({
          name,
          size,
          batchesMetaData,
        })
      );
    }
    resolve(true);
  });
};
