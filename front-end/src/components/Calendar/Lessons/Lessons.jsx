import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Fade,
  Modal,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import useInput from 'hooks/useInput';
import { regexTime } from 'helpers/regex';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Lessons.module.scss';

const timeHelperText = 'Time is invalid';

const Lessons = ({ isOpen, closeModal, date }) => {
  const [checked, setChecked] = useState([]);
  const {
    value: enteredTime,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    valueOnBlurHandler: timeBlurHandler,
  } = useInput('time', dayjs(date).format('YYYY-MM-DD HH:mm'), regexTime);

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

  const addLesson = () => {};
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      disableAutoFocus
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={styles.modal}>
          <Box className={styles.modal__header}>
            <Typography variant='h6'>Lessons</Typography>
            <IconButton className={styles.modal__closeBtn} onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={styles.modal__content}>
            <Button startIcon={<AddIcon />} variant='text' onClick={addLesson}>
              Add lesson
            </Button>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  inputFormat='HH:mm'
                  mask='__:__'
                  ampm={false}
                  // minutesStep={5}
                  label='Basic example'
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
              <List dense sx={{ width: '100%' }}>
                {[0, 1, 2, 3].map((value) => {
                  return (
                    <ListItem key={value} disablePadding>
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox edge='start' checked={checked.indexOf(value) !== -1} />
                        </ListItemIcon>
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={`Line item ${value + 1}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

Lessons.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  date: PropTypes.object,
};

export default Lessons;
