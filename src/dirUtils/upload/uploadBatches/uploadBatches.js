import { getBatchesMetadata } from "./getBatchesMetadata/getBatchesMetadata";

import { readAndSaveBatches } from "./readAndSaveBatches/readAndSaveBatches";

import { setStatus } from "../../../status/status";

import { saveFileMetadataInIndexedDB } from "../../../idbUtils/saveFileMetadataInIndexedDB/saveFileMetadataInIndexedDB";

export const uploadBatches = async (
  filesWithMetadata,
  numberOfChunksInSingleBatch
) => {
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
      numberOfChunksInSingleBatch
    );
    // Here we will save files metadata to indexed db

    await saveFileMetadataInIndexedDB(
      file,
      fileName,
      fileSize,
      batchesMetaData,
      chunksArr
    );

    await readAndSaveBatches(file, batchesMetaData);

    setStatus(
      `<h2>
      ${file["name"]} has been saved successfully
      </h2>`
    );
  }
};
