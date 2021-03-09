const DisplayFiles = ({ files }) => {
  let myFiles = [];
  for (const fileKey in files) {
    if (Object.hasOwnProperty.call(files, fileKey)) {
      const { name, size } = files[fileKey];
      myFiles.push({ name, size });
    }
  }
  return (
    <div>
      {myFiles.map(({ name, size }, i) => (
        <span className="border border-dark rounded m-2 p-2" key={i}>
          {name}--{(size / 1000 / 1000).toFixed(2)}_MB
        </span>
      ))}
    </div>
  );
};

export default DisplayFiles;
