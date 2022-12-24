import React, { useState } from 'react';
import { Box, IconButton, Fade, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import LessonForm from '../LessonForm/LessonForm';
import ScheduledLessons from '../ScheduledLessons/ScheduledLessons';

import dayjs from 'dayjs';

import CloseIcon from '@mui/icons-material/Close';

import styles from './Lessons.module.scss';

const lessons = [
  // {
  //   id: 1,
  //   time: '16:00',
  //   students: ['Sam McMillan, John Connor, Tim Drake'],
  // },
  // {
  //   id: 2,
  //   time: '12:50',
  //   students: ['Sam McMillan, John Connor, Tim Drake'],
  // },
  // {
  //   id: 3,
  //   time: '17:30',
  //   students: ['Sam McMillan, John Connor, Tim Drake'],
  // },
  // {
  //   id: 4,
  //   time: '11:25',
  //   students: ['Sam McMillan, John Connor, Tim Drake'],
  // },
  // {
  //   id: 5,
  //   time: '15:55',
  //   students: ['Sam McMillan, John Connor, Tim Drake'],
  // },
];

const students = [
  {
    fullName: 'Sam McMillan',
  },
  {
    fullName: 'Sam McMillan',
  },
  {
    fullName: 'Sam McMillan',
  },
  {
    fullName: 'Sam McMillan',
  },
  {
    fullName: 'Sam McMillan',
  },
];

const Lessons = ({ isOpen, closeModal, date }) => {
  const [lessonFormIssOpen, setLessonFormIsOpen] = useState(false);

  const openHandler = () => {
    setLessonFormIsOpen(true);
  };
  const closeHandler = () => {
    setLessonFormIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      disableAutoFocus
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={styles.modal}>
          <Box className={styles.modal__header}>
            <Typography sx={{ fontWeight: '600' }}>{dayjs(date).format('dddd, D MMMM')}</Typography>
            <IconButton className={styles.modal__closeBtn} onClick={closeModal}>
              <CloseIcon color='white' />
            </IconButton>
          </Box>
          {!lessonFormIssOpen ? (
            <ScheduledLessons lessons={lessons} openLesson={openHandler} />
          ) : (
            <LessonForm day={date} students={students} closeForm={closeHandler} />
          )}
          {/* {!addLessonIssOpen && (
              <Button startIcon={<AddIcon />} variant='text' onClick={openHandler}>
                Schedule lesson
              </Button>
            )}
            {addLessonIssOpen && <LessonForm day={date} closeForm={closeHandler} />} */}
        </Box>
      </Fade>
    </Modal>
  );
};

Lessons.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  date: PropTypes.object,
};

export default Lessons;
