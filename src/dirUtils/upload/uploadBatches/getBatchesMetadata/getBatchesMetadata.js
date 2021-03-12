import { getBatchIndexes } from "../getBatchIndexes/getBatchIndexes";

export const getBatchesMetadata = async (
  fileName,
  fileSize,
  chunksArr,
  numberOfChunksInSingleBatch
) => {
  const getBatchesMetadataPromise = new Promise(async (resolve, reject) => {
    const totalChunksLength = chunksArr.length;
    const totalBatchesCount = Math.ceil(
      totalChunksLength / numberOfChunksInSingleBatch
    );
    let startBatchCounter = 0;
    let endBatchCounter = numberOfChunksInSingleBatch;
    let batchesMetadata = {};
    for (let index = 0; index < totalBatchesCount; index++) {
      let batchObj = {};
      const batchChunksObj = await getBatchIndexes(
        chunksArr,
        startBatchCounter,
        endBatchCounter
      );
      batchObj.startBatchCounter = startBatchCounter;
      batchObj.endBatchCounter = endBatchCounter;
      batchObj.chunks = batchChunksObj;
      batchObj.totalChunksCount = Object.keys(batchChunksObj).length;
      batchObj.fileName = fileName;

      batchesMetadata[`batch__${index}`] = batchObj;

      startBatchCounter = endBatchCounter;
      endBatchCounter = endBatchCounter + numberOfChunksInSingleBatch;
    }
    resolve(batchesMetadata);
  });

  return await getBatchesMetadataPromise;
};
