import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// MUI library
import { Box, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Components
import ModalWindow from 'components/ResetPassword/ModalWindow';

// Context
import Loader from 'components/common/Loader/Loader';
import { CurrentUserContext } from 'context/AppProvider';

// Hooks
import useInput from 'hooks/useInput';

import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// Services
import { uploadPhoto } from 'services/firebaseService';
import { updateUserById } from 'services/userService';

// Helpers
import { regexFullName, regexEmail, regexDateOfBirth } from 'helpers/regex';

// Assets
import userImg from 'assets/sidebar/avatar.png';
import { updateToken } from 'services/tokenService';

// Styles
import styles from './GeneralInfo.module.scss';
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

const GeneralInfo = ({ snackbarShowMessage }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [open, setOpen] = useState(false);
  const [existEmail, setExistEmail] = useState(false);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const file = e.target.files[0];
      const url = await uploadPhoto(file);
      const updatedUser = await updateUserById(currentUser._id, { url });
      setCurrentUser(updatedUser);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChanges = async (id, data) => {
    try {
      setIsLoading(true);
      const updatedUser =
        data.email !== currentUser.email
          ? await updateUserById(id, data)
          : await updateUserById(id, { fullName: data.fullName, dateOfBirth: data.dateOfBirth });
      setCurrentUser(updatedUser.user);
      updateToken(updatedUser.token);
      snackbarShowMessage({
        message: 'Changes saved',
        severity: 'success',
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setExistEmail(true);
      snackbarShowMessage({
        message: 'Error',
        severity: 'error',
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
            {existEmail && currentUser.email !== enteredEmail && (
              <div className={styles.existEmail}>Exist user with this email</div>
            )}
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
      )}
    </>
  );
};

GeneralInfo.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  snackbarShowMessage: PropTypes.func,
};

GeneralInfo.defaultProps = {
  open: true,
  setOpen: () => {},
};

export default withSnackbar(GeneralInfo);
