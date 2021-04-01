import { openDB } from "idb";

export const saveReceiveSubBatchdMetadata = (fileName, subBatchesMetaData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = "files";
      const storeName = "filesMetadata";
      const key = fileName;
      const db = await openDB(dbName, 1, {
        upgrade(db) {
          db.createObjectStore(storeName);
        },
      });
      const existedValue = await db.get(storeName, key);
      let value = {
        ...existedValue,
        subBatchesMetaData: value?.subBatchesMetaData
          ? {
              ...existedValue.subBatchesMetaData,
              subBatchesMetaData,
            }
          : {},
      };
      if (existedValue) {
        if (!existedValue?.isReceived) {
          db.close();
          resolve(true);
          return;
        } else {
          value.subBatchesMetaData = {
            ...existedValue.subBatchesMetaData,
            ...subBatchesMetaData,
          };
        }
      }
      console.log("value: ", value);
      await db.put(storeName, value, key);
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
