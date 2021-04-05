export const sendFilesMetadata = function (idbFiles, alivaWebRTC) {
  return new Promise(async (resolve, reject) => {
    try {
      let dataChannel =
        alivaWebRTC.dataChannels["metadataDataChannel"]?.dataChannel;
      if (!dataChannel) {
        dataChannel = await alivaWebRTC.createDataChannel(
          "metadataDataChannel"
        );
      }
      for (let index = 0; index < idbFiles.length; index++) {
        const { name, size, fileHash } = idbFiles[index];
        console.log("Idb Files: ", idbFiles[index]);
        dataChannel.send(
          JSON.stringify({
            name,
            size,
            isReceived: true,
            fileHash,
          })
        );
        await awaitConfirmation(dataChannel);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const awaitConfirmation = (dc) => {
  return new Promise((resolve, reject) => {
    dc.onmessage = (event) => {
      const message = event.data;
      try {
        const { received } = JSON.parse(message);
        if (received) {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    };
  });
};
