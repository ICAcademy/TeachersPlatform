let io;
exports.socketConnection = (server) => {
  io = server;
  server.on('connection', (socket) => {
    socket.on('disconnect', (reason) => {
      console.log(reason);
    });
  });
};

exports.socket = (event, data) => io.emit(event, data);
