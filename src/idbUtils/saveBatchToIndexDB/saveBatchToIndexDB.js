import { openDB } from "idb";

export const saveBatchToIndexDB = async (fileName, batche) => {
  const saveBatchToIndexDBPromise = new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);

      for (const indexes in batche) {
        if (Object.hasOwnProperty.call(batche, indexes)) {
          const value = batche[indexes];
          const { startSliceIndex, endSliceIndex } = value;
          const key = `${startSliceIndex}__${endSliceIndex}`;
          await db.put("chunks", value, key);
        }
      }
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
  return await saveBatchToIndexDBPromise;
};
