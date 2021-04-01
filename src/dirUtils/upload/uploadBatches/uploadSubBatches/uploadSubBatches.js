import redux from "../../../../utils/manageRedux";

import { getBatchesMetadata } from "../getBatchesMetadata/getBatchesMetadata";

import { readAndSaveBatches } from "../readAndSaveBatches/readAndSaveBatches";

import { setStatus } from "../../../../status/status";

import { saveFileSunBatchesMetadataInIndexedDB } from "../../../../idbUtils/saveFileSunBatchesMetadataInIndexedDB/saveFileSunBatchesMetadataInIndexedDB";

import { alivaWebRTC } from "../../../../webrtc";

export const uploadSubBatches = async (filesWithMetadata) => {
  return new Promise(async (resolve, reject) => {
    try {
      for (
        let outerIndex = 0;
        outerIndex < filesWithMetadata.length;
        outerIndex++
      ) {
        const { fileName, fileSize, chunksArr, file } = filesWithMetadata[
          outerIndex
        ];
        const batchesMetaData = await getBatchesMetadata(
          fileName,
          fileSize,
          chunksArr,
          alivaWebRTC.chunkCountInSingleSubBatch
        );
        // Here we will save files metadata to indexed db
        console.log("batchesMetaData: ", batchesMetaData);

        await saveFileSunBatchesMetadataInIndexedDB(fileName, batchesMetaData);

        setStatus(
          `<h2>
            ${file["name"]} has been saved successfully
          </h2>`
        );
        await redux.moveToidbState(file["name"]);
        console.log("uploadedfile:>>>>>>>>", file);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
