import { alivaWebRTC } from "../index";

import { getFileMetadataFromIndexedDB } from "../../idbUtils/getFileMetadataFromIndexedDB/getFileMetadataFromIndexedDB";

import { loadBatchOfChunks } from "../../idbUtils/loadBatchOfChunks/loadBatchOfChunks";

import { sendBatchOfChunks } from "../sendBatchOfChunks/sendBatchOfChunks";

import { waitForBatchConfirmation } from "../waitForBatchConfirmation/waitForBatchConfirmation";

import { isBatchAlreadyExistOnReceiver } from "../isBatchAlreadyExistOnReceiver/isBatchAlreadyExistOnReceiver";

export const sendFile = async (fileName) => {
  const fileMetadata = await getFileMetadataFromIndexedDB(fileName);
  const batchesMetadata = fileMetadata["batchesMetaData"];
  const batchesKeys = Object.keys(batchesMetadata);
  const currentDcCount = Object.keys(alivaWebRTC.dataChannels).length;
  if (currentDcCount < 4) {
    await alivaWebRTC.settingUpDatachannels(100);
  } else {
    console.log(`${currentDcCount} data channels already exists`);
  }
  for (let key = 0; key < batchesKeys.length; key++) {
    const batchKey = batchesKeys[key];
    const { chunks, batchHash } = batchesMetadata[batchKey];
    // We will send these batch of chunks to other peer
    const batchOfChunksIDB = await loadBatchOfChunks(
      batchHash,
      fileName,
      chunks
    );
    const isBatchExists = await isBatchAlreadyExistOnReceiver(batchHash);
    if (!isBatchExists) {
      await sendBatchOfChunks(batchOfChunksIDB);
      await waitForBatchConfirmation(fileName, batchKey);
    }
    console.log("batchOfChunksIDB: ", batchOfChunksIDB);
  }
};
