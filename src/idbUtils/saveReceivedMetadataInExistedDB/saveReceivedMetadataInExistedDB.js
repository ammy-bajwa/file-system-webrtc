import { openDB } from "idb";

export const saveReceivedMetadataInExistedDB = function (
  fileName,
  fileSize,
  batchesMetaData
) {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);
      const key = "metadata";
      const existedValue = await db.get("fileMetadata", key);
      console.log("existedValue: ", existedValue);
      //   debugger;
      //   if (existedValue) {
      //     const value = {
      //       fileName,
      //       fileSize,
      //       batchesMetaData: {
      //         ...existedValue.batchesMetaData,
      //         ...batchesMetaData,
      //       },
      //       isReceived: true,
      //     };

      //     await db.add("fileMetadata", value, key);
      //     console.log("value: ", value);
      //     console.log("Alright");
      //   }
      db.close();
      resolve(true);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
