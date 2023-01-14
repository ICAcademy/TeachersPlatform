import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LessonsHeader from 'components/Lessons/LessonsHeader/LessonsHeader';

import { getSingleLessonById } from 'services/lessonService';
import Quiz from 'components/questions/Quiz/Quiz';

import { io } from 'socket.io-client';
import { CurrentUserContext } from 'context/AppProvider';

const socket = io('http://localhost:5000');

const Lesson = () => {
  const { id } = useParams();

  const {
    currentUser: { role },
  } = useContext(CurrentUserContext);

  const [lesson, setLesson] = useState({});

  const fetchLessonById = async (lessonId) => {
    try {
      const response = await getSingleLessonById(lessonId);
      setLesson(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLessonById(id);

    socket.on('user:connected', (data) => setLesson(data));

    socket.emit('user:join', id, role);

    return () => socket.emit('user:leave', id, role);
  }, [id, role]);

  return (
    <>
      <LessonsHeader
        title={lesson.topic}
        level={lesson.level}
        teacherStatus={lesson.teacherStatus}
        studentStatus={lesson.studentStatus}
      />
      <Quiz id={id} questions={lesson.questions} isLesson={true} />
    </>
  );
};

export default Lesson;
