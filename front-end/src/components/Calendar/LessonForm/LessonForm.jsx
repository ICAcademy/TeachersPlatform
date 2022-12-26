import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import useInput from 'hooks/useInput';
import { regexTime } from 'helpers/regex';

const timeHelperText = 'Time is invalid';

const LessonForm = ({ day, students, scheduleLesson }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const {
    value: enteredTime,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    valueOnBlurHandler: timeBlurHandler,
  } = useInput('time', dayjs(day).format('YYYY-MM-DD HH:mm'), regexTime);

  const handleToggle = (value) => () => {
    const currentIndex = selectedStudents.indexOf(value.studentID.fullName);
    const newSelected = [...selectedStudents];

    if (currentIndex === -1) {
      newSelected.push(value.studentID.fullName);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedStudents(newSelected);
  };

  const saveLesson = () => {
    const lesson = { id: new Date(), time: enteredTime, students: selectedStudents };
    scheduleLesson(lesson);
  };

  return (
    <Box sx={{ pt: '20px', px: '20px' }}>
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
              error={timeHasError}
              helperText={timeHasError ? timeHelperText : ''}
            />
          )}
        />
      </LocalizationProvider>
      <List sx={{ width: '100%', maxHeight: '350px', mt: '20px', mb: '10px', overflowY: 'auto' }}>
        {students.map((student) => {
          return (
            <ListItem key={student.studentID._id} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(student)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={selectedStudents.indexOf(student.studentID.fullName) !== -1}
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={student.studentID.fullName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button
        variant='contained'
        onClick={saveLesson}
        sx={{
          display: 'flex',
          marginRight: 0,
          marginLeft: 'auto',
        }}
      >
        Save
      </Button>
    </Box>
  );
};

LessonForm.propTypes = {
  type: PropTypes.string,
  day: PropTypes.object,
  students: PropTypes.array,
  scheduleLesson: PropTypes.func,
};

export default LessonForm;
