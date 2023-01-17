const {
  updateLesson,
  updateOnDisconnect,
  updateLessonAnswerById,
  endLesson,
  startLesson,
} = require('../services/LessonService');

const getStatus = (role, status, socketId) =>
  role === 'teacher'
    ? { teacherStatus: status, teacherSocketId: socketId }
    : { studentStatus: status, studentSocketId: socketId };

const registerLessonHandlers = (io, socket) => {
  const addLesson = async (body) => {
    const lesson = await startLesson(body);

    io.emit('lesson:added', lesson);
  };

  const userJoin = async (roomId, role) => {
    socket.join(roomId);

    const body = getStatus(role, 'online', socket.id);

    const lesson = await updateLesson(roomId, body);

    io.to(roomId).emit('lesson:updated', lesson);
  };

  const userLeave = async (roomId, role) => {
    socket.leave(roomId);

    const body = getStatus(role, 'offline', socket.id);

    const lesson = await updateLesson(roomId, body);

    io.to(roomId).emit('lesson:updated', lesson);
  };

  const userSelectAnswer = async (roomId, questionId, answer) => {
    const lesson = await updateLessonAnswerById(roomId, questionId, answer);

    io.to(roomId).emit('lesson:updated', lesson);
  };

  const userEndLesson = async (roomId) => {
    await endLesson(roomId);

    io.to(roomId).emit('lesson:ended');
  };

  const userDisconnect = async () => {
    socket.leaveAll();

    const lesson = await updateOnDisconnect(socket.id);

    io.to(lesson?._id.toString()).emit('lesson:updated', lesson);
  };

  socket.on('lesson:add', addLesson);
  socket.on('lesson:join', userJoin);
  socket.on('lesson:leave', userLeave);
  socket.on('lesson:select-answer', userSelectAnswer);
  socket.on('lesson:end', userEndLesson);
  socket.on('disconnect', userDisconnect);
};

module.exports = { registerLessonHandlers };
