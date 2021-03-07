import { addFilesMetadata } from "./addFilesMetadata/addFilesMetadata";

import { uploadBatches } from "./uploadBatches/uploadBatches";

import { setStatus } from "../../status/status";

export const handleDirUpload = async (
  fileElement,
  chunkSize,
  numberOfChunksInSingleBatch
) => {
  const files = fileElement.files;
  const fileInfoHtml = getFilesInfoString(files);
  setStatus(fileInfoHtml);
  const filesWithMetadata = await addFilesMetadata(files, chunkSize);
  console.log(filesWithMetadata);
  setStatus(`Metadata added to all files`);
  const uploadInBatches = await uploadBatches(
    filesWithMetadata,
    numberOfChunksInSingleBatch
  );
};

const getFilesInfoString = (files) => {
  let fileInfoHtml = "";
  for (let index = 0; index < files.length; index++) {
    const { name } = files[index];
    fileInfoHtml += `<span class="m-2 p-2 border border-secondary">${name}</span>`;
  }
  return fileInfoHtml;
};
