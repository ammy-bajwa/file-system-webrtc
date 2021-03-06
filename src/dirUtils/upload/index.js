import { getChunksArr } from "../../fileUtils/getChunksArr/getChunksArr";

export const handleDirUpload = async (fileElement) => {
  let files = fileElement.files,
    filesObj;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = file["webkitRelativePath"];
    const fileName = file["name"];
    const fileSize = file["size"];
    filesObj = {
      filePath,
      fileName,
      fileSize,
    };
    const cunksArr = await getChunksArr(fileSize, 40000);
    console.log(cunksArr);
    console.log(filesObj);
  }
};
