import React, { useState } from 'react';
import { Box } from '@mui/material';

import CalendarHeader from 'components/Calendar/CalendarHeader/CalendarHeader';
import Month from 'components/Calendar/Month/Month';

import { getMonth } from 'helpers/getDate';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const sx = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};

const currentMonthIndex = dayjs().month();

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState([]);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(currentMonthIndex);

  const monthAndYear = dayjs(new Date(dayjs().year(), selectedMonthIdx)).format('MMMM YYYY');
  const monthName = dayjs(new Date(dayjs().year(), selectedMonthIdx)).format('MMM');

  // console.log(selectedMonthIdx);

  const nextMonthHandler = () => {
    setSelectedMonthIdx((prev) => ++prev);
  };

  const prevMonthHandler = () => {
    setSelectedMonthIdx((prev) => --prev);
  };

  const currentMonthHandler = () => {
    setSelectedMonthIdx(currentMonthIndex);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(selectedMonthIdx));
  }, [selectedMonthIdx]);

  return (
    <Box sx={sx.calendar}>
      <CalendarHeader
        toCurrentMonth={currentMonthHandler}
        toNextMonth={nextMonthHandler}
        toPrevMonth={prevMonthHandler}
        dateTitle={monthAndYear}
      />
      <Month monthMatrix={currentMonth} currentMonth={monthName} />
    </Box>
  );
};

export default Calendar;
