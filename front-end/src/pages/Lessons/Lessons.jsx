import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { CurrentUserContext } from 'context/AppProvider';

import { getAllLessons } from 'services/lessonService';

import styles from './Lessons.module.scss';

import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PersonIcon from '@mui/icons-material/Person';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  const {
    currentUser: { roleId },
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
          <Link to={`${lesson._id}`} key={lesson._id} className={styles.lesson}>
            <Box className={styles.lesson__info}>
              <Box className={styles.lesson__info__item}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: '10px', transform: 'translateY(-5%)' }}>
                  <LabelImportantIcon />
                </ListItemIcon>
                <ListItemText primary={lesson.topic} />
              </Box>
              <Box className={styles.lesson__info__item}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: '10px', transform: 'translateY(-5%)' }}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={lesson.topic} />
              </Box>
            </Box>
            <Box
              className={
                lesson.lessonStatus === 'processing'
                  ? `${styles.lesson__status} ${styles['lesson__status--processing']}`
                  : `${styles.lesson__status} ${styles['lesson__status--ended']}`
              }
            >
              {lesson.lessonStatus}
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Lessons;
