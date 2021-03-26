import { useState, useEffect } from "react";
import { getFileBatchesFromIDB } from "../idbUtils/getFileBatches/getFileBatches";
import Modal from "./modal";
const DisplayIdbFiles = function ({ files }) {

  const [modalIsOpen,setIsOpen] = useState(false);
  const [file,setFile] = useState("");

  const getVideo = async (batchesMetaData) => {
    let getFile = await getFileBatchesFromIDB(batchesMetaData);
    let fileURL = await URL.createObjectURL(getFile);
    
    setFile(fileURL);
    openModal();
  }
  function openModal() {
    setIsOpen(true);
  }
 
  function closeModal(){
    setIsOpen(false);
  }
  return (
    <div className="d-flex justify-content-center flex-wrap m-4">
      {files.length === 0 && <h3 className="text-info">No File</h3>}
      {files.map(
        (
          { name, size, isReceived, isOnlyMetadata, batchesMetaData, fileHash },
          i
        ) => (
          <div key={i} className="m-3">
            {!isReceived && !isOnlyMetadata && (
              <span className="border border-dark rounded m-2 p-3">
                {name}--<b>{(size / 1000 / 1000).toFixed(2)}_MB</b>
                {/* {isDelete ? (
              <button
              type="button"
              className="btn btn-danger m-2"
              onClick={() => deleteFile(batchesMetaData, name)}
              >
              Delete
              </button>
            ) : null} */}
            <button className="btn btn-success m-1" onClick={()=>getVideo(batchesMetaData)}>Play</button>
              </span>
            )}
            <Modal modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} file={file} />
          </div>
        )
      )}
    </div>
  );
};

export default DisplayIdbFiles;
