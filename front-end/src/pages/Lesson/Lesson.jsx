import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LessonsHeader from 'components/Lessons/LessonsHeader/LessonsHeader';

import { getSingleLessonById } from 'services/lessonService';
import Quiz from 'components/questions/Quiz/Quiz';
import Loader from 'components/common/Loader/Loader';

import { CurrentUserContext } from 'context/AppProvider';

import { socket } from 'services/socketService';

const Lesson = () => {
  const { id } = useParams();

  const {
    currentUser: { role },
  } = useContext(CurrentUserContext);

  const [lesson, setLesson] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchLessonById = async (lessonId) => {
    try {
      setIsLoading(true);
      const response = await getSingleLessonById(lessonId);
      setLesson(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLessonById(id);
  }, [id]);

  useEffect(() => {
    socket.emit('lesson:user-join', id, role);

    socket.on('lesson:updated', (data) => setLesson(data));

    return () => socket.emit('lesson:user-leave', id, role);
  }, [id, role]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <LessonsHeader
        title={lesson.topic}
        level={lesson.level}
        teacherStatus={lesson.teacherStatus}
        studentStatus={lesson.studentStatus}
        teacherName={lesson.teacherId?.fullName}
        studentName={lesson.studentId?.fullName}
        teacherImg={lesson.teacherId?.url}
        studentImg={lesson.studentId?.url}
      />
      <Quiz id={id} questions={lesson.questions} isLesson={true} />
    </>
  );
};

export default Lesson;
