import React, { useContext } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { CalendarContext } from 'context/CalendarProvider';

import styles from './CalendarHeader.module.scss';

const CalendarHeader = () => {
  const { monthAndYear, nextMonthHandler, prevMonthHandler, currentMonthHandler } =
    useContext(CalendarContext);

  return (
    <Box className={styles.container}>
      <Box className={styles.calendarActions}>
        <Button
          variant='contained'
          sx={{
            marginRight: '20px',
          }}
          onClick={currentMonthHandler}
        >
          Today
        </Button>
        <IconButton onClick={prevMonthHandler}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={nextMonthHandler}>
          <ChevronRightIcon />
        </IconButton>
        <Box component='span' sx={{ ml: '15px', fontWeight: '600' }}>
          {monthAndYear}
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarHeader;
