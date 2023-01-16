const { updateLesson, updateOnDisconnect } = require('../services/LessonService');

const getStatus = (role, socketId) =>
  role === 'teacher'
    ? { teacherStatus: 'online', teacherSocketId: socketId }
    : { studentStatus: 'online', studentSocketId: socketId };

const registerLessonHandlers = (io, socket) => {
  const userJoin = async (id, role) => {
    socket.join(id);

    const body = getStatus(role, socket.id);

    const lesson = await updateLesson(id, body);

    io.to(id).emit('user:update-lesson', lesson);
  };

  const userLeave = async (id, role) => {
    socket.leave(id);

    const body = getStatus(role, socket.id);

    const lesson = await updateLesson(id, body);

    io.to(id).emit('user:update-lesson', lesson);
  };

  const userDisconnect = async () => {
    socket.leaveAll();

    const lesson = await updateOnDisconnect(socket.id);

    io.to(lesson._id).emit('user:update-lesson', lesson);
  };

  socket.on('user:join', userJoin);
  socket.on('user:leave', userLeave);
  socket.on('disconnect', userDisconnect);
};

module.exports = { registerLessonHandlers };
