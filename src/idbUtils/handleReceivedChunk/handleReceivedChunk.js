import { openDB } from "idb";

export const handleReceivedChunk = ({
  fileName,
  fileChunk,
  startSliceIndex,
  endSliceIndex,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      const db = await openDB(dbName, 1);
      const key = `${startSliceIndex}__${endSliceIndex}`;
      const value = {
        fileName,
        fileChunk,
        startSliceIndex,
        endSliceIndex,
      };
      await db.add("chunks", value, key);
      db.close();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
