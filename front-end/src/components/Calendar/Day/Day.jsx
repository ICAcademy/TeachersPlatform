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

  const { monthName, getLessonsForDay, closeLessonForm, setSelectedMonthIdx } =
    useContext(CalendarContext);

  const lessons = getLessonsForDay(day);

  const handleClickOnDay = () =>
    day.format('MMM') === monthName ? setModalIsOpen(true) : setSelectedMonthIdx(day.month());

  const closeHandler = () => {
    setModalIsOpen(false);
    closeLessonForm();
  };

  let lessonsPreview;

  if (lessons.length === 1) {
    lessonsPreview = (
      <Box className={styles.preview}>
        <Box className={`${styles.preview__item} ${styles.preview__more}`}>
          {`${lessons.length} lesson`}
        </Box>
      </Box>
    );
  } else if (lessons.length > 1) {
    lessonsPreview = (
      <Box className={styles.preview}>
        <Box className={`${styles.preview__item} ${styles.preview__more}`}>
          {`${lessons.length} lessons`}
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Lessons isOpen={modalIsOpen} closeModal={closeHandler} date={day} lessonsList={lessons} />
      <Box
        className={`${styles.day} ${rowIdx === 0 && styles.firstRowDay}`}
        onClick={handleClickOnDay}
      >
        {rowIdx === 0 && <Box className={styles.dayOfWeek}>{day.format('ddd')}</Box>}
        <Box
          className={`${styles.dayOfMoth} ${checkForToday(day)} ${checkForCurrentMonth(
            day,
            monthName,
          )}`}
        >
          {day.format('D')}
        </Box>
        {lessonsPreview}
      </Box>
    </>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  rowIdx: PropTypes.number,
};

export default Day;
