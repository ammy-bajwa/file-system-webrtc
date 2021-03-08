export const addWebrtcListener = function (uuid) {
  return new Promise((resolve, reject) => {
    try {
      this.channel.on(`channel:onOffer_${uuid}`, async (data) => {
        const { offer } = data;
        console.log("Offer received: ", offer);
      });
      this.channel.on(`channel:onAnswer_${uuid}`, async (data) => {
        const { answer } = data;
        console.log("Answer received: ", answer);
      });
      this.channel.on(`channel:onCandidate_${uuid}`, async (data) => {
        const { candidate } = data;
        console.log("Candidate received: ", candidate);
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
