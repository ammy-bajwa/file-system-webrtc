import { getBatchIndexes } from "../getBatchIndexes/getBatchIndexes";

export const getBatchesMetadata = async (
  fileName,
  fileSize,
  chunksArr,
  numberOfChunksInSingleBatch
) => {
  const totalChunksLength = chunksArr.length;
  const baseBatches = Math.ceil(
    totalChunksLength / numberOfChunksInSingleBatch
  );
  const totalBatchesCount = baseBatches + 1;
  let startBatchCounter = 0;
  let endBatchCounter = numberOfChunksInSingleBatch;
  for (let index = 0; index < totalBatchesCount; index++) {
    const batchChunksObj = await getBatchIndexes(
      chunksArr,
      startBatchCounter,
      endBatchCounter
    );
    startBatchCounter = endBatchCounter;
    endBatchCounter = endBatchCounter + numberOfChunksInSingleBatch;
    console.log("batchChunksObj: ", batchChunksObj);
  }
};
