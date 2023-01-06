let spectators = [];

const registerQuestionHandlers = (io, socket) => {
  const userJoin = (data) => {
    const user = spectators.find((item) => item.id === data.id);

    if (!user) {
      spectators.push(data);
    }

    io.emit('user:connected', spectators);
  };

  socket.on('user:join', userJoin);
  socket.on('disconnect', () => {
    socket.leaveAll();
  });
};

module.exports = { registerQuestionHandlers };
