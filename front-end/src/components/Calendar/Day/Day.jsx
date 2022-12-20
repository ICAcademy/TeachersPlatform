import React from 'react';

import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import styles from './Day.module.scss';
import { Box } from '@mui/material';

const checkForToday = (day) => {
  const isToday = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? styles.today : '';
  return isToday;
};

const checkForCurrentMonth = (day, month) => {
  const isCurrentMonth = day.format('MMM') === month ? styles.currentMonth : '';
  return isCurrentMonth;
};

const Day = ({ day, monthIdx }) => {
  return (
    <Box className={styles.day}>
      <Box
        className={`${styles.dayOfMoth} ${checkForToday(day)} ${checkForCurrentMonth(
          day,
          monthIdx,
        )}`}
      >
        {day.format('DD')}
      </Box>
    </Box>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  monthIdx: PropTypes.string,
};

export default Day;
