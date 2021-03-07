import { getBatchesMetadata } from "./getBatchesMetadata/getBatchesMetadata";

import { readBatches } from "./readBatches/readBatches";

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
    await readBatches(file, batchesMetaData);
  }
};
