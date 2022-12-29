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

import { CalendarContext } from 'context/CalendarProvider';

import AddIcon from '@mui/icons-material/Add';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import styles from './ScheduledLessons.module.scss';

const sx = {
  item: {
    alignItems: 'flex-start',
    '& .MuiListItemSecondaryAction-root': {
      height: '100%',
    },
  },
  icon: { minWidth: 'auto', mr: '10px' },
};

const ScheduledLessons = ({ list }) => {
  const { deleteLesson, openLessonForm, openFormForEdit } = useContext(CalendarContext);

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
                sx={sx.item}
                className={styles.lesson}
                secondaryAction={
                  <Box sx={sx.actions}>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => openFormForEdit(lesson._id)}
                    >
                      <EditIcon fontSize='small' sx={{ mr: '5px' }} />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => deleteLesson(lesson._id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                }
              >
                <Box className={styles.lesson__time}>
                  <ListItemIcon sx={sx.icon}>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary={dayjs(lesson.date).format('HH:mm')} />
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
                  <ListItemText primary={lesson.studentId} />
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
      <Button
        startIcon={<AddIcon />}
        variant='contained'
        onClick={openLessonForm}
        sx={{ display: 'flex', margin: '0 auto' }}
      >
        Schedule lesson
      </Button>
    </>
  );
};

ScheduledLessons.propTypes = {
  list: PropTypes.array,
};

export default ScheduledLessons;
