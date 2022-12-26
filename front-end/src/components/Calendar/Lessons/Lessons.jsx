import React, { useState } from 'react';
import { Box, IconButton, Fade, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import LessonForm from '../LessonForm/LessonForm';
import ScheduledLessons from '../ScheduledLessons/ScheduledLessons';

import dayjs from 'dayjs';

import CloseIcon from '@mui/icons-material/Close';

import styles from './Lessons.module.scss';

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

// const sortLessons = (list) => {
//   const sortedList = list.sort((prev, curr) => {
//     if
//   })
// }

const Lessons = ({ isOpen, closeModal, date }) => {
  const [lessonsList, setLessonsList] = useState([]);
  const [lessonFormIssOpen, setLessonFormIsOpen] = useState(false);

  const openHandler = () => {
    setLessonFormIsOpen(true);
  };

  const addLessonHandler = (lesson) => {
    // const newLessons = [...lessonsList, lesson];
    setLessonsList((prev) => [...prev, lesson]);
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
            <ScheduledLessons lessons={lessonsList} openLesson={openHandler} />
          ) : (
            <LessonForm day={date} students={students} addLesson={addLessonHandler} />
          )}
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
