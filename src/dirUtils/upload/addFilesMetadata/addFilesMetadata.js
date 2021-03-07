import { getChunksArr } from "../../../fileUtils/getChunksArr/getChunksArr";

export const addFilesMetadata = async (files, chunkSize) => {
  const filesMetadataPromise = new Promise(async (resolve, reject) => {
    try {
      let filesObj,
        filesWithChunskingInfo = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = file["webkitRelativePath"];
        const fileName = file["name"];
        const fileSize = file["size"];
        const chunksArr = await getChunksArr(fileSize, chunkSize);
        filesObj = {
          filePath,
          fileName,
          fileSize,
          chunksArr,
          file,
        };
        filesWithChunskingInfo.push(filesObj);
      }
      resolve(filesWithChunskingInfo);
    } catch (error) {
      reject(error);
    }
  });
  return await filesMetadataPromise;
};
