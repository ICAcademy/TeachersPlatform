import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import { withSnackbar } from 'components/withSnackbar/withSnackbar';
import { CurrentUserContext } from './AppProvider';

import { getMonthMatrix } from 'helpers/getDate';
import {
  deleteScheduledLesson,
  getAllScheduledLessons,
  scheduleLesson,
  updateScheduledLesson,
} from 'services/scheduledLessonService';
import { getTeachersSubscription } from 'services/subscriptionService';

export const CalendarContext = createContext();

const dateFormat = 'YYYY/MM/D';

const year = dayjs().year();
const monthIdx = dayjs().month();
const firstDay = dayjs().startOf('M').format('D');
const lastDay = dayjs().endOf('M').format('D');

const minDate = dayjs(new Date(year, monthIdx, firstDay)).format(dateFormat);
const maxDate = dayjs(new Date(year, monthIdx, lastDay)).format(dateFormat);

const sortLessonsByDate = (list) =>
  list.sort((prev, curr) => dayjs(prev.date).diff(dayjs(curr.date)));

const CalendarProvider = ({ children, snackbarShowMessage }) => {
  const {
    currentUser: { role, roleId },
  } = useContext(CurrentUserContext);

  const [studentsList, setStudentsList] = useState([]);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(monthIdx);
  const [monthMatrix, setMonthMatrix] = useState([]);
  const [lessonsList, setLessonsList] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({});
  const [lessonFormIsOpen, setLessonFormIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState(null);

  const monthAndYear = dayjs(new Date(dayjs().year(), selectedMonthIdx)).format('MMMM YYYY');
  const monthName = dayjs(new Date(dayjs().year(), selectedMonthIdx)).format('MMM');

  const fetchStudents = async (id) => {
    try {
      const list = await getTeachersSubscription(id);
      const studentsList = list.map((item) => ({
        id: item.studentID._id,
        fullName: item.studentID.fullName,
      }));
      setStudentsList(studentsList);
    } catch (error) {
      console.log(error);
    }
  };

  const getLessonsForDay = (date) =>
    lessonsList.filter(
      (lesson) => dayjs(lesson.date).format('YYYY/MM/DD') === date.format('YYYY/MM/DD'),
    );

  const fetchLessons = async (id) => {
    try {
      const params = { id, minDate, maxDate };
      const lessons = await getAllScheduledLessons(params);
      setLessonsList(lessons);
    } catch (error) {
      console.error(error);
    }
  };

  const createLesson = async (data, params) => {
    try {
      let message;
      if (params.repeat) {
        message = 'Lessons scheduled';
        const newLessons = await scheduleLesson(data, params);
        const updatedLessons = sortLessonsByDate([...lessonsList, ...newLessons]);
        setLessonsList(updatedLessons);
      } else {
        message = 'Lesson scheduled';
        const newLesson = await scheduleLesson(data, params);
        const updatedLessons = sortLessonsByDate([...lessonsList, newLesson]);
        setLessonsList(updatedLessons);
      }
      closeLessonForm();
      setFormError(null);
      snackbarShowMessage({
        message: message,
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
    setMonthMatrix(getMonthMatrix(selectedMonthIdx));
  }, [selectedMonthIdx]);

  useEffect(() => {
    if (roleId) {
      fetchLessons(roleId);
      fetchStudents(roleId);
    }
  }, [roleId]);

  return (
    <CalendarContext.Provider
      value={{
        role,
        roleId,
        studentsList,
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
