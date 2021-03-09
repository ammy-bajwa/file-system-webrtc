import { openDB } from "idb";

export const getAllSavedFiles = async function () {
  const allDBs = await window.indexedDB.databases();
  let files = [];
  for (var i = 0; i < allDBs.length; i++) {
    const isFileDB = allDBs[i].name.search("file__");
    if (isFileDB < 0) {
      return;
    } else {
      const dbName = allDBs[i].name;
      const db = await openDB(dbName);
      const store = db.transaction("fileMetadata").objectStore("fileMetadata");
      const fileMetadata = await store.get("metadata");
      files.push({ name: fileMetadata.fileName, size: fileMetadata.fileSize });
    }
  }
  return files;
};
