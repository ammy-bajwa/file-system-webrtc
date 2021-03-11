export const getSpecificFileChunk = async (
  file,
  startSliceIndex,
  endSliceIndex
) => {
  const fileChunkPromise = new Promise(async (resolve, reject) => {
    try {
      const fileName = file["name"] || "";
      const slicedFilePart = file.slice(startSliceIndex, endSliceIndex);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", async (event) => {
        const fileChunk = {
          fileChunk: event.target.result,
          startSliceIndex,
          endSliceIndex,
          fileName,
        };
        resolve(fileChunk);
      });
      // Base64
      fileReader.readAsDataURL(slicedFilePart);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
  return await fileChunkPromise;
};
