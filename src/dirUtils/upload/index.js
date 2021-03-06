import { getChunksArr } from "../../fileUtils/getChunksArr/getChunksArr";

export const handleDirUpload = (event) => {
  let files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i].webkitRelativePath);
  }
};
