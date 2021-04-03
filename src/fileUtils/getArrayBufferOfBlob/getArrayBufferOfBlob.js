export const getArrayBufferOfBlob = function (fileBlob) {
  return new Promise(async (resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          resolve(reader.result);
        },
        false
      );

      if (fileBlob) {
        reader.readAsDataURL(fileBlob);
      }
    } catch (error) {
      reject(error);
    }
  });
};
