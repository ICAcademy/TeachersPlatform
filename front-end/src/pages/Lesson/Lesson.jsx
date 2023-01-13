import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import LessonsHeader from 'components/Lessons/LessonsHeader/LessonsHeader';

import { getSingleLessonById } from 'services/lessonService';
import Quiz from 'components/questions/Quiz/Quiz';

const Lesson = () => {
  const { id } = useParams();

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
  }, [id]);

  return (
    <>
      <LessonsHeader title={lesson.topic} level={lesson.level} />
      <Quiz id={id} questions={lesson.questions} isLesson={true} />
    </>
  );
};

export default Lesson;
