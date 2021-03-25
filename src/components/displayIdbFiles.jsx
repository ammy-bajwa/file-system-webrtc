const DisplayIdbFiles = function ({ files }) {
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
              <span className="border border-dark rounded m-2 p-2">
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
              </span>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default DisplayIdbFiles;
