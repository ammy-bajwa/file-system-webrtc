import { handleDirUpload } from "../../../dirUtils/upload/index";

export const onSubmit = (event) => {
  event.preventDefault();
  const directoryUploaded = event.target.elements[0];
  handleDirUpload(directoryUploaded);
};
