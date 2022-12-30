import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import { CurrentUserContext } from 'context/AppProvider';
import { CalendarContext } from 'context/CalendarProvider';

import useInput from 'hooks/useInput';
import { regexLabel, regexTime } from 'helpers/regex';
import { getTeachersSubscription } from 'services/subscriptionService';

const timeHelperText = 'Provide valid time (hh:mm)';
const labelHelperText = 'Label is required and should be less than 30 symbols';
const radioHelperText = 'Select student from the list';

const sx = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    pt: '20px',
    px: '20px',
  },
  input: {
    width: '65%',
  },
  radio: {
    width: '100%',
    maxHeight: '350px',
    overflowY: 'auto',
  },
  formActions: {
    display: 'flex',
    columnGap: '10px',
    marginRight: 0,
    marginLeft: 'auto',
  },
};

const LessonForm = ({ day }) => {
  const { createLesson, updateLesson, selectedLesson, isEditing, formError, closeLessonForm } =
    useContext(CalendarContext);
  const {
    currentUser: { roleId: teacherId },
  } = useContext(CurrentUserContext);

  const label = isEditing ? selectedLesson.label : '';
  const date = isEditing ? selectedLesson.date : dayjs(day).format('YYYY/MM/DD HH:mm');
  const student = isEditing ? selectedLesson.studentId : '';
  const isSelected = isEditing;

  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(student);
  const [studentIsSelected, setStudentIsSelected] = useState(isSelected);

  const {
    value: enteredLabel,
    isValid: labelIsValid,
    hasError: labelHasError,
    valueChangeHandler: labelChangeHandler,
    valueOnBlurHandler: labelBlurHandler,
  } = useInput('label', label, regexLabel);

  const {
    value: enteredTime,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    valueOnBlurHandler: timeBlurHandler,
  } = useInput('time', date, regexTime);

  const formIsValid = labelIsValid && timeIsValid && studentIsSelected;

  const handleRadioChange = (e) => {
    setStudentIsSelected(true);
    setSelectedStudent(e.target.value);
  };

  const submitHandler = () => {
    const data = {
      label: enteredLabel,
      date: enteredTime,
      teacherId,
      studentId: selectedStudent,
    };
    return isEditing ? updateLesson(selectedLesson._id, data) : createLesson(data);
  };

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

  useEffect(() => {
    fetchStudents(teacherId);
  }, [teacherId]);

  return (
    <Box sx={sx.container}>
      <TextField
        type='text'
        label='Label:'
        value={enteredLabel}
        onChange={labelChangeHandler}
        onBlur={labelBlurHandler}
        error={labelHasError}
        sx={sx.input}
        helperText={labelHasError ? labelHelperText : ''}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          inputFormat='HH:mm'
          mask='__:__'
          ampm={false}
          label='Select lesson time'
          value={enteredTime}
          onChange={timeChangeHandler}
          renderInput={(params) => (
            <TextField
              {...params}
              onBlur={timeBlurHandler}
              error={formError?.field === 'time' ? true : timeHasError}
              helperText={
                formError?.field === 'time' ? formError?.msg : timeHasError ? timeHelperText : ''
              }
              sx={sx.input}
            />
          )}
        />
      </LocalizationProvider>

      <FormControl sx={sx.radio}>
        <FormLabel id='students'>Students:</FormLabel>
        <RadioGroup
          id='students'
          name='controlled-radio-buttons-group'
          value={selectedStudent}
          onChange={handleRadioChange}
        >
          {studentsList.map((student) => (
            <FormControlLabel
              key={student.id}
              value={student.id}
              control={<Radio />}
              label={student.fullName}
            />
          ))}
          <FormHelperText>{studentIsSelected ? '' : radioHelperText}</FormHelperText>
        </RadioGroup>
      </FormControl>

      <Box sx={sx.formActions}>
        <Button variant='outlined' onClick={closeLessonForm}>
          Cancel
        </Button>
        <Button variant='contained' onClick={submitHandler} disabled={!formIsValid}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

LessonForm.propTypes = {
  day: PropTypes.object,
};

export default LessonForm;
