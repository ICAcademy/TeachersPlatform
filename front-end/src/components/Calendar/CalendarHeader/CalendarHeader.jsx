import React from 'react';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './CalendarHeader.module.scss';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalendarHeader = ({ toCurrentMonth, toPrevMonth, toNextMonth, dateTitle }) => {
  return (
    <>
      <Box className={styles.calendarActions}>
        <Button
          variant='contained'
          sx={{
            marginRight: '20px',
          }}
          onClick={toCurrentMonth}
        >
          Today
        </Button>
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={toPrevMonth}
          className={`${styles.calendarActions__arrow} ${styles.calendarActions__leftArrow}`}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={toNextMonth}
          className={`${styles.calendarActions__arrow} ${styles.calendarActions__leftArrow}`}
        />
        <Box component='span' sx={{ ml: '15px' }}>
          {dateTitle}
        </Box>
      </Box>
      <Box className={styles.weekDays}>
        {daysOfWeek.map((day, i) => (
          <Box key={i} component='span'>
            {day}
          </Box>
        ))}
      </Box>
    </>
  );
};

CalendarHeader.propTypes = {
  toCurrentMonth: PropTypes.func,
  toNextMonth: PropTypes.func,
  toPrevMonth: PropTypes.func,
  dateTitle: PropTypes.string,
};

export default CalendarHeader;
