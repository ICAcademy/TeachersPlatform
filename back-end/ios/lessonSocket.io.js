const { updateLesson } = require('../services/LessonService');

const registerLessonHandlers = (io, socket) => {
  const userJoin = async (id, role) => {
    socket.join(id);

    const body = role === 'teacher' ? { teacherStatus: 'online' } : { studentStatus: 'online' };
    const lesson = await updateLesson(id, body);

    io.emit('user:connected', lesson);
  };

  const userLeave = async (id, role) => {
    socket.leave(id);

    const body = role === 'teacher' ? { teacherStatus: 'offline' } : { studentStatus: 'offline' };
    const lesson = await updateLesson(id, body);

    io.emit('user:connected', lesson);
  };

  socket.on('user:join', userJoin);
  socket.on('user:leave', userLeave);
};

module.exports = { registerLessonHandlers };
