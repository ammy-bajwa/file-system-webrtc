import { getBatchIndexes } from "../getBatchIndexes/getBatchIndexes";

export const getBatchesMetadata = async (
  fileName,
  fileSize,
  chunksArr,
  numberOfChunksInSingleBatch
) => {
  const totalChunksLength = chunksArr.length;
  const totalBatchesCount = Math.ceil(
    totalChunksLength / numberOfChunksInSingleBatch
  );
  let startBatchCounter = 0;
  let endBatchCounter = numberOfChunksInSingleBatch;
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
    startBatchCounter = endBatchCounter;
    endBatchCounter = endBatchCounter + numberOfChunksInSingleBatch;
    console.log("batchObj: ", batchObj);
  }
};
