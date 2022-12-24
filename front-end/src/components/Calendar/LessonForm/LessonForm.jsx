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

const LessonForm = ({ day, students, closeForm }) => {
  const [checked, setChecked] = useState([]);

  const {
    value: enteredTime,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    valueOnBlurHandler: timeBlurHandler,
  } = useInput('time', dayjs(day).format('YYYY-MM-DD HH:mm'), regexTime);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
        {students.map((student, i) => {
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(student)} dense>
                <ListItemIcon>
                  <Checkbox edge='start' checked={checked.indexOf(student) !== -1} />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={student.fullName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button
        variant='contained'
        onClick={closeForm}
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
  day: PropTypes.object,
  students: PropTypes.array,
  closeForm: PropTypes.func,
};

export default LessonForm;
