import { addFilesMetadata } from "./addFilesMetadata/addFilesMetadata";

import { uploadBatches } from "./uploadBatches/uploadBatches";

export const handleDirUpload = async (
  fileElement,
  chunkSize,
  numberOfChunksInSingleBatch
) => {
  const files = fileElement.files;
  const filesWithMetadata = await addFilesMetadata(files, chunkSize);
  console.log(filesWithMetadata);
  const uploadInBatches = await uploadBatches(
    filesWithMetadata,
    numberOfChunksInSingleBatch
  );
};
