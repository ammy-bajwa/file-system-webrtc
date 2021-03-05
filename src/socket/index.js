import { Socket } from "phoenix";
export const initializeSocket = () => {
  const socket = new Socket("ws://localhost:4000/socket");

  socket.connect();

  // Now that you are connected, you can join channels with a topic:
  let channel = socket.channel("channel:signal", {});
  channel
    .join()
    .receive("ok", (resp) => {
      console.log("Joined successfully", resp);
    })
    .receive("error", (resp) => {
      console.log("Unable to join", resp);
    });
};
