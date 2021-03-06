import { handleDirUpload } from "../../../dirUtils/upload/index";

export const onSubmit = async (event) => {
  event.preventDefault();
  const directoryUploaded = event.target.elements[0];
  await handleDirUpload(directoryUploaded, 4000, 800);
};
