import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import { withSnackbar } from 'components/withSnackbar/withSnackbar';
import { CurrentUserContext } from './AppProvider';

import { getMonth } from 'helpers/getDate';
import {
  deleteScheduledLesson,
  getAllScheduledLessons,
  scheduleLesson,
  updateScheduledLesson,
} from 'services/scheduledLessonService';

export const CalendarContext = createContext();

const year = dayjs().year();
const monthIdx = dayjs().month();
const firstDay = dayjs().startOf('M').format('D');
const lastDay = dayjs().endOf('M').format('D');

const minDate = dayjs(new Date(year, monthIdx, firstDay)).format('YYYY/MM/D');
const maxDate = dayjs(new Date(year, monthIdx, lastDay)).format('YYYY/MM/D');

const sortLessonsByDate = (list) =>
  list.sort((prev, curr) => dayjs(prev.date).diff(dayjs(curr.date)));

const CalendarProvider = ({ children, snackbarShowMessage }) => {
  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);

  const [selectedMonthIdx, setSelectedMonthIdx] = useState(monthIdx);
  const [monthMatrix, setMonthMatrix] = useState([]);
  const [lessonsList, setLessonsList] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({});
  const [lessonFormIsOpen, setLessonFormIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState(null);

  const monthAndYear = dayjs(new Date(dayjs().year(), selectedMonthIdx)).format('MMMM YYYY');
  const monthName = dayjs(new Date(dayjs().year(), selectedMonthIdx)).format('MMM');

  const getLessonsForDay = (date) =>
    lessonsList.filter(
      (lesson) => dayjs(lesson.date).format('YYYY/MM/DD') === date.format('YYYY/MM/DD'),
    );

  const fetchLessons = async (id) => {
    try {
      const lessons = await getAllScheduledLessons(id, minDate, maxDate);
      setLessonsList(lessons);
    } catch (error) {
      console.error(error);
    }
  };

  const createLesson = async (data) => {
    try {
      const newLesson = await scheduleLesson(data);
      const updatedLessons = sortLessonsByDate([...lessonsList, newLesson]);
      setLessonsList(updatedLessons);
      closeLessonForm();
      setFormError(null);
      snackbarShowMessage({
        message: 'Lesson scheduled',
        severity: 'success',
      });
    } catch (error) {
      setFormError(error.response.data);
      snackbarShowMessage({
        message: 'Smth went wrong',
        severity: 'error',
      });
    }
  };

  const updateLesson = async (id, data) => {
    try {
      const updatedLesson = await updateScheduledLesson(id, data);
      const updatedLessons = lessonsList.map((lesson) =>
        lesson._id === id ? updatedLesson : lesson,
      );
      setLessonsList(sortLessonsByDate(updatedLessons));
      setIsEditing(false);
      closeLessonForm();
      setFormError(null);
      snackbarShowMessage({
        message: 'Lesson updated',
        severity: 'success',
      });
    } catch (error) {
      setFormError(error.response.data);
      snackbarShowMessage({
        message: 'Smth went wrong',
        severity: 'error',
      });
    }
  };

  const deleteLesson = async (id) => {
    try {
      await deleteScheduledLesson(id);
      const updatedLessons = lessonsList.filter((lesson) => lesson._id !== id);
      setLessonsList(updatedLessons);
      snackbarShowMessage({
        message: 'Lesson deleted',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);
      snackbarShowMessage({
        message: 'Smth went wrong',
        severity: 'error',
      });
    }
  };

  const openLessonForm = () => {
    setLessonFormIsOpen(true);
  };

  const openFormForEdit = (id) => {
    setIsEditing(true);
    setLessonFormIsOpen(true);
    const lesson = lessonsList.find((lesson) => lesson._id === id);
    setSelectedLesson(lesson);
  };

  const closeLessonForm = () => {
    setLessonFormIsOpen(false);
    setFormError(null);
    setIsEditing(false);
  };

  const nextMonthHandler = () => {
    setSelectedMonthIdx((prev) => ++prev);
  };

  const prevMonthHandler = () => {
    setSelectedMonthIdx((prev) => --prev);
  };

  const currentMonthHandler = () => {
    setSelectedMonthIdx(monthIdx);
  };

  useEffect(() => {
    setMonthMatrix(getMonth(selectedMonthIdx));
    fetchLessons(roleId);
  }, [selectedMonthIdx, roleId]);

  return (
    <CalendarContext.Provider
      value={{
        isEditing,
        selectedLesson,
        getLessonsForDay,
        createLesson,
        updateLesson,
        deleteLesson,
        lessonFormIsOpen,
        openLessonForm,
        openFormForEdit,
        closeLessonForm,
        formError,
        monthMatrix,
        selectedMonthIdx,
        monthAndYear,
        monthName,
        nextMonthHandler,
        prevMonthHandler,
        currentMonthHandler,
        minDate,
        maxDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

CalendarProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(CalendarProvider);
