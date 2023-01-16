import React from 'react';
import { Box } from '@mui/material';

import CalendarHeader from 'components/Calendar/CalendarHeader/CalendarHeader';
import Month from 'components/Calendar/Month/Month';

// Styles
import styles from './Calendar.module.scss';

const sx = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    p: '1px',
  },
};

const Calendar = () => {
  return (
    <Box sx={sx.calendar} className={styles.calendarWrap}>
      <div className={styles.calendarBody}>
        <CalendarHeader />
        <Month />
      </div>
    </Box>
  );
};

export default Calendar;
