export const connectionSocket = (socket) => {
  socket.emit("messages", "hola perdedor");
};
