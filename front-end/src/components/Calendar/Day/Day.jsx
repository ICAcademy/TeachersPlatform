import React, { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import Lessons from 'components/Calendar/Lessons/Lessons';

import dayjs from 'dayjs';

import styles from './Day.module.scss';

const checkForToday = (day) => {
  const isToday = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? styles.today : '';
  return isToday;
};

const checkForCurrentMonth = (day, month) => {
  const isCurrentMonth = day.format('MMM') === month ? styles.currentMonth : '';
  return isCurrentMonth;
};

const Day = ({ day, monthIdx }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openHandler = () => setModalIsOpen(true);
  const closeHandler = () => setModalIsOpen(false);

  return (
    <>
      <Lessons isOpen={modalIsOpen} closeModal={closeHandler} date={day} />
      <Box className={styles.day} onClick={openHandler}>
        <Box
          className={`${styles.dayOfMoth} ${checkForToday(day)} ${checkForCurrentMonth(
            day,
            monthIdx,
          )}`}
        >
          {day.format('DD')}
        </Box>
      </Box>
    </>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  monthIdx: PropTypes.string,
};

export default Day;
