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
    _id: '63a97d92ad92909491745d43',
    teacherID: '63a97c1fad92909491745d24',
    studentID: {
      _id: '638e22b018582825af142181',
      fullName: 'Kaily Parker',
      dateOfBirth: '10/10/1999',
      email: 'kailyparker@gmail.com',
      createdAt: '2022-12-05T16:56:16.519Z',
      updatedAt: '2022-12-05T16:56:16.519Z',
      __v: 0,
    },
    __v: 0,
  },
  {
    _id: '63a97da4ad92909491745d48',
    teacherID: '63a97c1fad92909491745d24',
    studentID: {
      _id: '638f4cacec500ab19fa3dd65',
      fullName: 'Pavlo Parker',
      dateOfBirth: '11/07/1997',
      email: 'programmer@gmail.com',
      createdAt: '2022-12-06T14:07:40.950Z',
      updatedAt: '2022-12-06T14:07:40.950Z',
      __v: 0,
    },
    __v: 0,
  },
];

const sortLessons = (list) => {
  const sortedList = list.sort((prev, curr) => dayjs(prev.time).diff(dayjs(curr.time)));
  return sortedList;
};

const Lessons = ({ isOpen, closeModal, date, lessons, setLessons }) => {
  const [lessonFormIssOpen, setLessonFormIsOpen] = useState(false);

  const openHandler = () => {
    setLessonFormIsOpen(true);
  };

  const scheduleHandler = (lesson) => {
    const lessonsCopy = sortLessons([...lessons, lesson]);
    localStorage.setItem('lessons', JSON.stringify(lessonsCopy));
    setLessons(lessonsCopy);
    setLessonFormIsOpen(false);
  };

  const removeHandler = (id) => {
    const newLessons = lessons.filter((lesson) => lesson.id !== id);
    localStorage.setItem('lessons', JSON.stringify(newLessons));
    setLessons(newLessons);
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
            <ScheduledLessons
              lessons={lessons}
              openForm={openHandler}
              removeLesson={removeHandler}
            />
          ) : (
            <LessonForm day={date} students={students} scheduleLesson={scheduleHandler} />
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
  lessons: PropTypes.array,
  setLessons: PropTypes.func,
};

export default Lessons;
