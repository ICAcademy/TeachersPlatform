import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { CurrentUserContext } from 'context/AppProvider';

import LessonItem from './LessonItem/LessonItem';

import { getAllLessons } from 'services/lessonService';

import styles from './Lessons.module.scss';
import { TEACHER_ROLE } from 'constants/userRoles';

const getParticipant = (role, lesson) =>
  role === TEACHER_ROLE ? lesson.studentId.fullName : lesson.teacherId.fullName;

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  const {
    currentUser: { roleId, role },
  } = useContext(CurrentUserContext);

  const fetchLessons = async (id) => {
    try {
      const data = await getAllLessons(id);
      setLessons(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLessons(roleId);
  }, [roleId]);

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: '20px', pl: '10px' }}>
        Lessons
      </Typography>
      <Box className={styles.lessons}>
        {lessons.map((lesson) => (
          <LessonItem
            key={lesson._id}
            id={lesson._id}
            topic={lesson.topic}
            participant={getParticipant(role, lesson)}
            status={lesson.lessonStatus}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Lessons;
