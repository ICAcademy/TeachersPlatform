import React, { useContext, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ModalWindow from 'components/ResetPassword/ModalWindow';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { CurrentUserContext } from 'context/AppProvider';

import useInput from 'hooks/useInput';

import { uploadPhoto } from 'services/firebaseService';

import { updateUserById } from 'services/userService';
import { regexFullName, regexEmail, regexDateOfBirth } from 'helpers/regex';

import styles from './GeneralInfo.module.scss';
import userImg from 'assets/sidebar/avatar.png';

const sx = {
  saveBtn: { maxWidth: '100px', ml: 'auto' },
};

const minAge = 8;
const maxAge = 100;

const minDate = `${dayjs().year() - maxAge}/12/31`;
const maxDate = `${dayjs().year() - minAge}/12/31`;

const fullNameHelperText =
  'Enter 2 capitalized words; each word has a min of 2 and a max of 16 letters';
const emailHelperText = 'Please enter a valid email address; examples: cockroaches@gmail.com';
const dateOfBirthHelperText = `Please enter a valid date in range between ${minDate} and ${maxDate}`;

const GeneralInfo = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const {
    value: enteredFullName,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    valueOnBlurHandler: fullNameBlurHandler,
  } = useInput('fullName', currentUser.fullName, regexFullName);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueOnBlurHandler: emailBlurHandler,
  } = useInput('email', currentUser.email, regexEmail);

  const {
    value: enteredDateOfBirth,
    isValid: dateOfBirthIsValid,
    hasError: dateOfBirthHasError,
    valueChangeHandler: dateOfBirthChangeHandler,
    valueOnBlurHandler: dateOfBirthBlurHandler,
  } = useInput('date', currentUser.dateOfBirth, regexDateOfBirth);

  const formIsValid = fullNameIsValid && emailIsValid && dateOfBirthIsValid;

  const changePhoto = async (e) => {
    try {
      const file = e.target.files[0];
      const url = await uploadPhoto(file);
      const updatedUser = await updateUserById(currentUser._id, { url });
      setCurrentUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const saveChanges = async (id, data) => {
    try {
      const updatedUser = await updateUserById(id, data);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        component='img'
        src={currentUser.url || userImg}
        alt='User photo'
        className={styles.profile__img}
      />
      <Button component='label'>
        Change profile photo
        <input onChange={changePhoto} hidden accept='image/*' type='file' />
      </Button>
      <Box className={styles.profile__content}>
        <TextField
          type='text'
          label='Full name:'
          value={enteredFullName}
          onChange={fullNameChangeHandler}
          onBlur={fullNameBlurHandler}
          error={fullNameHasError}
          helperText={fullNameHasError ? fullNameHelperText : ''}
          sx={sx.profileItem}
        />
        <TextField
          type='email'
          label='Email:'
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailHasError}
          helperText={emailHasError ? emailHelperText : ''}
          sx={sx.profileItem}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat='DD/MM/YYYY'
            disableFuture
            minDate={minDate}
            maxDate={maxDate}
            className={styles.profile__item}
            value={enteredDateOfBirth}
            onChange={dateOfBirthChangeHandler}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Birth date:'
                onBlur={dateOfBirthBlurHandler}
                error={dateOfBirthHasError}
                helperText={dateOfBirthHasError ? dateOfBirthHelperText : ''}
              />
            )}
          />
        </LocalizationProvider>
        <Button
          variant='contained'
          color='primary'
          disabled={!formIsValid}
          sx={sx.saveBtn}
          onClick={() =>
            saveChanges(currentUser._id, {
              fullName: enteredFullName,
              email: enteredEmail,
              dateOfBirth: enteredDateOfBirth,
            })
          }
        >
          Save
        </Button>
      </Box>
      <Button variant='outlined' color='primary' onClick={() => setOpen(true)}>
        Change password
      </Button>
      <ModalWindow open={open} handleClose={handleClose} />
    </>
  );
};

GeneralInfo.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

GeneralInfo.defaultProps = {
  open: true,
  setOpen: () => {},
};

export default GeneralInfo;
