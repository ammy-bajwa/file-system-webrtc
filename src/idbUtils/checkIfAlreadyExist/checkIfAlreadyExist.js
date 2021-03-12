import { openDB, deleteDB } from "idb";

export const checkIfAlreadyExist = (dbName) => {
  return new Promise(async (resolve, reject) => {
    try {
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
