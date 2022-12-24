import React from 'react';
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

import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import styles from './ScheduledLessons.module.scss';

const ScheduledLessons = ({ lessons, openLesson }) => {
  return (
    <>
      <Box className={styles.lessons}>
        {lessons.length ? (
          <List
            dense
            sx={{
              maxHeight: '340px',
              overflowY: 'auto',
              marginTop: '10px',
              marginLeft: '20px',
            }}
          >
            {lessons.map((lesson, i) => (
              <ListItem
                key={i}
                sx={{ alignItems: 'flex-start' }}
                className={styles.lesson}
                secondaryAction={
                  <Box>
                    <IconButton edge='end' aria-label='delete'>
                      <EditIcon fontSize='small' sx={{ mr: '5px' }} />
                    </IconButton>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                }
              >
                <Box className={styles.lesson__time}>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary={lesson.time} />
                </Box>
                <Box className={styles.lesson__students}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={lesson.students.join(', ')} />
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
        onClick={openLesson}
        sx={{ display: 'flex', margin: '0 auto' }}
      >
        Schedule lesson
      </Button>
    </>
  );
};

ScheduledLessons.propTypes = {
  lessons: PropTypes.array,
  openLesson: PropTypes.func,
};

export default ScheduledLessons;
