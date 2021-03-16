import { alivaWebRTC } from "../index";

import { sendBatchOfChunks } from "../sendBatchOfChunks/sendBatchOfChunks";

export const waitForBatchConfirmation = (
  fileName,
  batchKey,
  batchHash,
  batchOfChunksIDB
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataChannel =
        alivaWebRTC.dataChannels["batchConfirmation"]?.dataChannel;
      if (!dataChannel) {
        dataChannel = await alivaWebRTC.createDataChannel("batchConfirmation");
      }
      console.log("Inside batch confirmation");
      let batchConfirmationPayload = {
        isConfirmation: true,
        batchKey,
        batchHash,
        fileName,
      };
      batchConfirmationPayload = JSON.stringify(batchConfirmationPayload);
      console.log("waitForBatchConfirmation: ", waitForBatchConfirmation);
      dataChannel.onmessage = async (event) => {
        try {
          const { batchHash, missingBatchChunks } = JSON.parse(event.data);
          console.log("Confirmation: ", { missingBatchChunks, batchHash });
          if (missingBatchChunks.length > 0) {
            let missingChunksToResend = {};
            for (let index = 0; index < missingBatchChunks.length; index++) {
              const chunkKey = missingBatchChunks[index];
              const [startSliceIndex, endSliceIndex] = chunkKey.split("__");
              missingChunksToResend[chunkKey] = batchOfChunksIDB[chunkKey];
              console.log(
                `Resending ${startSliceIndex}__${endSliceIndex} chunk`
              );
              console.log(`missingChunksToResend: ${missingChunksToResend}`);
              await sendBatchOfChunks(missingChunksToResend, batchHash);
            }
            dataChannel.send(batchConfirmationPayload);
            resolve(true);
          } else {
            resolve(true);
          }
        } catch (error) {
          console.error(error);
        }
      };
      dataChannel.send(batchConfirmationPayload);
    } catch (error) {
      reject(error);
    }
  });
};
