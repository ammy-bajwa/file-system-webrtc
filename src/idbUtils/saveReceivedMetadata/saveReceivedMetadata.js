import { openDB } from "idb";

export const saveReceivedMetadata = (fileName, fileSize, batchesMetaData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isDbAlredyExists = true;
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore("fileMetadata");
          db.createObjectStore("chunks");
          isDbAlredyExists = false;
        },
      });
      const key = "metadata";
      let value = {
        fileName,
        fileSize,
        batchesMetaData,
        isReceived: true,
      };
      if (isDbAlredyExists) {
        const existedValue = await db.get("fileMetadata", key);
        // console.log("existedValue: ", existedValue);
        value.batchesMetaData = {
          ...existedValue.batchesMetaData,
          ...batchesMetaData,
        };
      }

      console.log("should show");
      await db.put("fileMetadata", value, key);
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
