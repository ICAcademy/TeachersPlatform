import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';

import Loader from 'components/common/Loader/Loader';
import CalendarHeader from 'components/Calendar/CalendarHeader/CalendarHeader';
import Month from 'components/Calendar/Month/Month';

import { CalendarContext } from 'context/CalendarProvider';

import { TEACHER_ROLE } from 'constants/userRoles';

// Styles
import styles from './Calendar.module.scss';

const Calendar = () => {
  const { role, fetchLessons, fetchStudents, isLoading } = useContext(CalendarContext);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  useEffect(() => {
    role === TEACHER_ROLE && fetchStudents();
  }, [fetchStudents, role]);

  return isLoading ? (
    <Loader />
  ) : (
    <Box className={styles.calendarWrap}>
      <CalendarHeader />
      <Month />
    </Box>
  );
};

export default Calendar;
