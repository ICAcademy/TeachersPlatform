import React, { useState } from 'react';
import { Box } from '@mui/material';

import CalendarHeader from 'components/Calendar/CalendarHeader/CalendarHeader';
import Month from 'components/Calendar/Month/Month';

import { getMonth } from 'helpers/getDate';

const sx = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  return (
    <Box sx={sx.calendar}>
      <CalendarHeader />
      <Month month={currentMonth} />
    </Box>
  );
};

export default Calendar;
