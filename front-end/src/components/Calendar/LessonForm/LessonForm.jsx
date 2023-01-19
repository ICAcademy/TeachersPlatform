import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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

import { CalendarContext } from 'context/CalendarProvider';

import useInput from 'hooks/useInput';
import { REGEX_LABEL, REGEX_TIME } from 'helpers/regex';

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
  const {
    roleId,
    studentsList,
    createLesson,
    updateLesson,
    selectedLesson,
    isEditing,
    formError,
    closeLessonForm,
  } = useContext(CalendarContext);

  const label = isEditing ? selectedLesson.label : '';
  const date = isEditing ? selectedLesson.date : dayjs(day).format('YYYY/MM/DD HH:mm');
  const student = isEditing ? selectedLesson.studentId : '';
  const isSelected = isEditing;

  const [selectedStudent, setSelectedStudent] = useState(student);
  const [studentIsSelected, setStudentIsSelected] = useState(isSelected);
  const [isRepeated, setIsRepeated] = useState(false);

  const {
    value: enteredLabel,
    isValid: labelIsValid,
    hasError: labelHasError,
    valueChangeHandler: labelChangeHandler,
    valueOnBlurHandler: labelBlurHandler,
  } = useInput('label', label, REGEX_LABEL);

  const {
    value: enteredTime,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    valueOnBlurHandler: timeBlurHandler,
  } = useInput('time', date, REGEX_TIME);

  const formIsValid = labelIsValid && timeIsValid && studentIsSelected;

  const toggleCheckbox = () => {
    setIsRepeated((prev) => !prev);
  };

  const handleRadioChange = (e) => {
    setStudentIsSelected(true);
    setSelectedStudent(e.target.value);
  };

  const submitHandler = () => {
    const params = { repeat: isRepeated };
    const data = {
      label: enteredLabel,
      date: enteredTime,
      teacherId: roleId,
      studentId: selectedStudent,
    };
    return isEditing ? updateLesson(selectedLesson._id, data) : createLesson(data, params);
  };

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

      {!isEditing && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={isRepeated} onChange={toggleCheckbox} />}
            label='Repeat every week for current month'
          />
        </FormGroup>
      )}

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
