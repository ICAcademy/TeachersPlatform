import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import Lessons from 'components/Calendar/Lessons/Lessons';

import { CalendarContext } from 'context/CalendarProvider';

import styles from './Day.module.scss';

const checkForToday = (day) => {
  const isToday = day.format('DD-MM-YYYY') === dayjs().format('DD-MM-YYYY') ? styles.today : '';
  return isToday;
};

const checkForCurrentMonth = (day, month) => {
  const isCurrentMonth = day.format('MMM') === month ? styles.currentMonth : '';
  return isCurrentMonth;
};

const Day = ({ day, rowIdx }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { monthName, getLessonsForDay, closeLessonForm } = useContext(CalendarContext);

  const lessons = getLessonsForDay(day);

  const openHandler = () => setModalIsOpen(true);
  const closeHandler = () => {
    setModalIsOpen(false);
    closeLessonForm();
  };

  const lessonsPreview =
    lessons.length > 2 ? (
      <>
        {lessons.slice(0, 2).map((lesson) => (
          <Box key={lesson._id} className={`${styles.preview__item} ${styles.preview__info}`}>
            {lesson.label}
          </Box>
        ))}
        <Box className={`${styles.preview__item} ${styles.preview__more}`}>
          {`${lessons.length - 2} more`}
        </Box>
      </>
    ) : (
      lessons.map((lesson) => (
        <Box key={lesson._id} className={`${styles.preview__item} ${styles.preview__info}`}>
          {lesson.label}
        </Box>
      ))
    );

  return (
    <>
      <Lessons isOpen={modalIsOpen} closeModal={closeHandler} date={day} lessonsList={lessons} />
      <Box className={`${styles.day} ${rowIdx === 0 && styles.firstRowDay}`} onClick={openHandler}>
        {rowIdx === 0 && <Box className={styles.dayOfWeek}>{day.format('ddd')}</Box>}
        <Box
          className={`${styles.dayOfMoth} ${checkForToday(day)} ${checkForCurrentMonth(
            day,
            monthName,
          )}`}
        >
          {day.format('D')}
        </Box>

        <Box className={styles.preview}>{lessonsPreview}</Box>
      </Box>
    </>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  rowIdx: PropTypes.number,
};

export default Day;
