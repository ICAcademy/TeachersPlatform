const { TEACHER } = require('../constants/UserRoles');

const {
  updateLesson,
  updateOnDisconnect,
  updateLessonAnswerById,
  endLesson,
  startLesson,
} = require('../services/LessonService');

const getStatus = (role, status, socketId) =>
  role === TEACHER
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
    const lesson = await endLesson(roomId);

    io.emit('lesson:ended', lesson);
  };

  const userDisconnect = async () => {
    const roomId = [...socket.rooms][1];

    socket.leave(roomId);

    const lesson = await updateOnDisconnect(roomId, socket.id);

    io.to(roomId).emit('lesson:updated', lesson);
  };

  const userCallRequest = async (data) => {
    io.to(data.roomId).emit('lesson:call-request', data);
  };

  const userCallApprove = async (data) => {
    io.to(data.roomId).emit('lesson:call-approve', data);
  };

  socket.on('lesson:add', addLesson);
  socket.on('lesson:join', userJoin);
  socket.on('lesson:leave', userLeave);
  socket.on('lesson:select-answer', userSelectAnswer);
  socket.on('lesson:end', userEndLesson);
  socket.on('disconnecting', userDisconnect);
  socket.on('lesson:call-request', userCallRequest);
  socket.on('lesson:call-approve', userCallApprove);
};

module.exports = { registerLessonHandlers };
