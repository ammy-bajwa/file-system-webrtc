import { openDB, deleteDB } from "idb";

export const checkIfAlreadyExist = (fileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbName = `file__${fileName}`;
      let isAlreadyExist = true;
      const db = await openDB(dbName, 1, {
        upgrade() {
          isAlreadyExist = false;
        },
      });
      db.close();
      if (!isAlreadyExist) {
        await deleteDB(dbName);
      }
      resolve(isAlreadyExist);
    } catch (error) {
      reject(error);
    }
  });
};
