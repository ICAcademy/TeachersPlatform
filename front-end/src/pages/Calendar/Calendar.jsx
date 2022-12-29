import React from 'react';
import { Box } from '@mui/material';

import CalendarHeader from 'components/Calendar/CalendarHeader/CalendarHeader';
import Month from 'components/Calendar/Month/Month';

const sx = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 50px)',
    p: '1px',
  },
};

const Calendar = () => {
  return (
    <Box sx={sx.calendar}>
      <CalendarHeader />
      <Month />
    </Box>
  );
};

export default Calendar;
