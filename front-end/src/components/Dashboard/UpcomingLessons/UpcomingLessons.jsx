import React, { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { CalendarContext } from 'context/CalendarProvider';
import { Box, Button, Typography, ListItemText, ListItemIcon } from '@mui/material';
import styles from './UpcomingLessons.module.scss';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { TEACHER_ROLE } from 'constants/userRoles';
import { CurrentUserContext } from 'context/AppProvider';

const UpcomingLessons = () => {
  const { roleId, fetchLessonsForWeek, lessonsForWeek } = useContext(CalendarContext);
  const {
    currentUser: { role },
  } = useContext(CurrentUserContext);

  const firstDayOfWeek = dayjs(new Date()).format('YYYY/MM/D');
  const lastDayOfWeek = dayjs().day(8).format('YYYY/MM/D');

  useEffect(() => {
    fetchLessonsForWeek(roleId, firstDayOfWeek, lastDayOfWeek);
  }, [fetchLessonsForWeek, firstDayOfWeek, lastDayOfWeek, roleId]);

  return (
    <Box className={styles.eventContainer}>
      <Box className={styles.eventBox}>
        <Typography sx={{ fontSize: '30px' }} className={styles.name}>
          Upcoming Lessons
        </Typography>
        <Button sx={{ backgroundColor: '#e2f3fc' }} size='small'>
          <Link className={styles.link} to={'calendar'}>
            View all
          </Link>
        </Button>
      </Box>
      {lessonsForWeek.length === 0 ? (
        <Typography sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
          No lessons for week
        </Typography>
      ) : (
        lessonsForWeek.slice(0, 4).map((lesson) => (
          <Box key={lesson._id} className={styles.eventBlock}>
            <Box className={styles.lesson}>
              <ListItemIcon>
                <div className={styles.letterIcon}></div>
              </ListItemIcon>
              <ListItemText primary={lesson.label} />
            </Box>
            <Box className={styles.lesson}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              {role === TEACHER_ROLE ? (
                <ListItemText primary={lesson.studentId.fullName} />
              ) : (
                <ListItemText primary={lesson.teacherId.fullName} />
              )}
            </Box>
            <Box className={styles.lesson}>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary={dayjs(lesson.date).format('dddd, D MMMM')} />
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default UpcomingLessons;
