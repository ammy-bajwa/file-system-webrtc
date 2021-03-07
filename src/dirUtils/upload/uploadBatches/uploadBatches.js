import { getBatchesMetadata } from "./getBatchesMetadata/getBatchesMetadata";

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
    getBatchesMetadata(
      fileName,
      fileSize,
      chunksArr,
      numberOfChunksInSingleBatch
    );
  }
};
