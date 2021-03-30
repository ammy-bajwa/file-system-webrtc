import { alivaWebRTC } from "../index";

import { sendBatchOfChunks } from "../sendBatchOfChunks/sendBatchOfChunks";

export const waitForBatchConfirmation = (
  fileName,
  batchKey,
  batchHash,
  batchOfChunksIDB,
  endBatchIndex,
  fileSize
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const peerConnection =
        alivaWebRTC.filesPeerConnections[fileName].peerConnection;
      const dataChannel = await peerConnection.createDataChannel(batchHash);
      let batchConfirmationPayload = {
        isConfirmation: true,
        batchKey,
        batchHash,
        fileName,
        endBatchIndex,
        fileSize,
      };
      batchConfirmationPayload = JSON.stringify(batchConfirmationPayload);
      dataChannel.onmessage = async (event) => {
        try {
          const { batchHash, isTotalBatchReceived, missingChunks } = JSON.parse(
            event.data
          );
          console.log("Confirmation: ", {
            isTotalBatchReceived,
            batchHash,
            missingChunks,
            fileName,
          });
          if (!isTotalBatchReceived) {
            const resendChunkObj = {};
            for (let index = 0; index < missingChunks.length; index++) {
              const chunkKey = missingChunks[index];

              const resendChunk = batchOfChunksIDB[chunkKey];
              if (resendChunk) {
                resendChunkObj[chunkKey] = resendChunk;
              }
            }
            console.log(
              "Resending batch: ",
              fileName,
              batchHash,
              missingChunks
            );
            if (missingChunks.length > 0) {
              await sendBatchOfChunks(fileName, resendChunkObj, batchHash);
              dataChannel.send(batchConfirmationPayload);
              console.log("Confirmation resend: ", fileName);
            }
          } else {
            resolve(true);
          }
        } catch (error) {
          console.error(error);
        }
      };
      dataChannel.onopen = () => {
        dataChannel.send(batchConfirmationPayload);
      };
    } catch (error) {
      reject(error);
    }
  });
};
