const registerDisconnect = (io, socket) => {
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};

module.exports = { registerDisconnect };
