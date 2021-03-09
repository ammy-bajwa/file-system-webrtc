export const handleMetadataChannel = function (dataChannel) {
  dataChannel.onopen = () => {
    console.log("On metadata datachannel open");
  };

  dataChannel.onerror = function (error) {
    console.log("Error:", error);
  };

  dataChannel.onmessage = async (event) => {
    const message = event.data;
    console.log("Got message: ", message);
  };
};
