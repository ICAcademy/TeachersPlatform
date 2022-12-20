import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';

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
        <IconButton onClick={toPrevMonth}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={toNextMonth}>
          <ChevronRightIcon />
        </IconButton>
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
