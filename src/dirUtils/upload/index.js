import { addFilesMetadata } from "./addFilesMetadata/addFilesMetadata";

import { uploadBatches } from "./uploadBatches/uploadBatches";

import { setStatus } from "../../status/status";
import { uploadSubBatches } from "./uploadBatches/uploadSubBatches/uploadSubBatches";
import { uploadFullFile } from "../../idbUtils/uploadFullFile/uploadFullFile";
import { getArrayBufferOfBlob } from "../../fileUtils/getArrayBufferOfBlob/getArrayBufferOfBlob";
import { getHashOfArraybuffer } from "../../fileUtils/getHashOfArraybuffer/getHashOfArraybuffer";
import { saveFileMetadataInIndexedDB } from "../../idbUtils/saveFileMetadataInIndexedDB/saveFileMetadataInIndexedDB";

export const handleDirUpload = async (
  fileElement,
  chunkSize,
  numberOfChunksInSingleBatch
) => {
  const files = fileElement.files;
  // console.log("files:", files);
  const fileInfoHtml = getFilesInfoString(files);
  setStatus(fileInfoHtml);

  // Here we are adding files metadata info to file objects
  const filesWithMetadata = await addFilesMetadata(files, chunkSize);

  setStatus(`<h2>Generating files batches.....</h2>`);

  // Here we will upload batches in
  await uploadBatches(filesWithMetadata, numberOfChunksInSingleBatch);

  await uploadSubBatches(filesWithMetadata);

  // let uploadFullFilePromises = [];
  // let uploadFileMetadataPromises = [];
  // for (const fileKey in files) {
  //     if (Object.hasOwnProperty.call(files, fileKey)) {
  //         const fileBlob = files[fileKey];
  //         const fileName = fileBlob["name"];
  //         setStatus(`<h2>${fileName} Generating array buffer </h2>`);
  //         const blob = new Blob([fileBlob]);
  //         const fileArrBuff = await blob.arrayBuffer();
  //         const hash = await getHashOfArraybuffer(fileArrBuff);
  //         setStatus(`<h2>${fileName} is completed</h2>`);
  //         uploadFileMetadataPromises.push(saveFileMetadataInIndexedDB(fileName, fileBlob["size"]));
  //         uploadFullFilePromises.push(uploadFullFile(hash, fileBlob));
  //     }
  //     await Promise.all(uploadFullFilePromises);
  //     await Promise.all(uploadFileMetadataPromises);
  // }
  setStatus(`<h2>All files uploaded</h2>`);
};

const getFilesInfoString = (files) => {
  let fileInfoHtml = "";
  for (let index = 0; index < files.length; index++) {
    const { name } = files[index];

    fileInfoHtml += `<h2 class="m-2 p-2 border border-secondary">${name}</h2>`;
  }
  return fileInfoHtml;
};
