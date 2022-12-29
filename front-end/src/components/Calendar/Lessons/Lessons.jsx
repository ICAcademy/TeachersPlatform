import React, { useContext } from 'react';
import { Box, IconButton, Fade, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import LessonForm from '../LessonForm/LessonForm';
import ScheduledLessons from '../ScheduledLessons/ScheduledLessons';

import { CalendarContext } from 'context/CalendarProvider';

import CloseIcon from '@mui/icons-material/Close';

import styles from './Lessons.module.scss';

const Lessons = ({ isOpen, closeModal, date, lessonsList }) => {
  const { lessonFormIsOpen } = useContext(CalendarContext);

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
          {!lessonFormIsOpen ? <ScheduledLessons list={lessonsList} /> : <LessonForm day={date} />}
        </Box>
      </Fade>
    </Modal>
  );
};

Lessons.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  date: PropTypes.object,
  lessonsList: PropTypes.array,
  setLessons: PropTypes.func,
};

export default Lessons;
