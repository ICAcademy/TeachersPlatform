import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { CurrentUserContext } from 'context/AppProvider';

import Loader from 'components/common/Loader/Loader';
import LessonItem from './LessonItem/LessonItem';

import { getAllLessons } from 'services/lessonService';

import styles from './Lessons.module.scss';
import { TEACHER_ROLE } from 'constants/userRoles';
import { socket } from 'services/socketService';

const getParticipant = (role, lesson) =>
  role === TEACHER_ROLE ? lesson.studentId.fullName : lesson.teacherId.fullName;

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentUser: { roleId, role },
  } = useContext(CurrentUserContext);

  const fetchLessons = async (id) => {
    try {
      setIsLoading(true);
      const data = await getAllLessons(id);
      setLessons(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLessons(roleId);

    socket.on('lesson:added', () => fetchLessons(roleId));
  }, [roleId]);

  return isLoading ? (
    <Loader />
  ) : (
    <Box>
      <Typography variant='h6' sx={{ mb: '20px', pl: '10px' }}>
        Lessons
      </Typography>
      {lessons.length ? (
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
      ) : (
        <Box className={styles.noLessons}>
          <Typography variant='h6' sx={{ mt: '15%' }}>
            You have no lessons for now
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Lessons;
