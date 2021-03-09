const DisplayFiles = ({ files }) => {
  let myFiles = [];
  for (const fileKey in files) {
    if (Object.hasOwnProperty.call(files, fileKey)) {
      const { name, size } = files[fileKey];
      myFiles.push({ name, size });
    }
  }
  return (
    <div className="d-flex justify-content-center flex-wrap m-4">
      {myFiles.length === 0 && <h3 className="text-info">No File</h3>}
      {myFiles.map(({ name, size }, i) => (
        <span className="border border-dark rounded m-2 p-2" key={i}>
          {name}--<b>{(size / 1000 / 1000).toFixed(2)}_MB</b>
        </span>
      ))}
    </div>
  );
};

export default DisplayFiles;
