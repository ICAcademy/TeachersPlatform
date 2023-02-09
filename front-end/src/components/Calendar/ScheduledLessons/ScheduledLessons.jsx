import React, { useContext } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { CalendarContext } from 'context/CalendarProvider';

import AddIcon from '@mui/icons-material/Add';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import styles from './ScheduledLessons.module.scss';

//Constants
import { TEACHER_ROLE } from 'constants/userRoles';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

const tz = dayjs.tz.guess();

console.log(tz);

const expiredLesson = (date) => dayjs().isSameOrBefore(dayjs(date), 'day');

const sx = {
  item: {
    alignItems: 'flex-start',
  },
  full: {
    '& .MuiListItemSecondaryAction-root': {
      height: '100%',
    },
  },
  single: {
    '& .MuiListItemSecondaryAction-root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      mr: '10px',
    },
  },
  icon: { minWidth: 'auto', mr: '10px' },
};

const ScheduledLessons = ({ list }) => {
  const { role, deleteLesson, openLessonForm, openFormForEdit } = useContext(CalendarContext);

  return (
    <>
      <Box className={styles.lessons}>
        {list.length ? (
          <List
            dense
            sx={{
              maxHeight: '340px',
              overflowY: 'auto',
              marginTop: '10px',
              marginLeft: '20px',
            }}
          >
            {list.map((lesson) => (
              <ListItem
                key={lesson._id}
                sx={
                  expiredLesson(lesson.date)
                    ? { ...sx.item, ...sx.full }
                    : { ...sx.item, ...sx.single }
                }
                className={styles.lesson}
                secondaryAction={
                  role === TEACHER_ROLE && (
                    <Box>
                      {expiredLesson(lesson.date) && (
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={() => openFormForEdit(lesson._id)}
                        >
                          <EditIcon fontSize='small' sx={{ mr: '5px' }} />
                        </IconButton>
                      )}
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => deleteLesson(lesson._id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  )
                }
              >
                <Box className={styles.lesson__time}>
                  <ListItemIcon sx={sx.icon}>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary={dayjs(lesson.date).tz(tz).format('HH:mm')} />
                </Box>
                <Box className={styles.lesson__label}>
                  <ListItemIcon sx={sx.icon}>
                    <LabelImportantIcon />
                  </ListItemIcon>
                  <ListItemText primary={lesson.label} />
                </Box>
                <Box className={styles.lesson__students}>
                  <ListItemIcon sx={sx.icon}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      role === TEACHER_ROLE ? lesson.studentId.fullName : lesson.teacherId.fullName
                    }
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant='body1' sx={{ margin: '20px auto', color: '#797979' }}>
            You dont have any lessons for today
          </Typography>
        )}
      </Box>
      {role === TEACHER_ROLE && (
        <Button
          startIcon={<AddIcon />}
          variant='contained'
          onClick={openLessonForm}
          sx={{ display: 'flex', margin: '0 auto' }}
        >
          Schedule lesson
        </Button>
      )}
    </>
  );
};

ScheduledLessons.propTypes = {
  list: PropTypes.array,
};

export default ScheduledLessons;
