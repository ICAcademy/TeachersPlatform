import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { FormControl, TextField, Box, InputAdornment, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCakeCandles,
  faEnvelope,
  faLock,
  faGraduationCap,
  faChalkboardUser,
} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

// Regex
import { regexEmail, regexFullName, regexPassword } from 'helpers/regex';

// Requests
import { userService } from 'services/authServices';

// Styles
import styles from './RegistrationForm.module.scss';

const RegistrationForm = () => {
  const [data, setData] = useState({
    role: 'student',
    fullName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [hasError, setHasError] = useState({
    hasFullNameError: false,
    hasEmailError: false,
    hasPasswordError: false,
    hasRepeatPasswordError: false,
  });

  const [isActive, setIsActive] = useState(false);

  const handleDateChange = (newValue) => {
    setData({ ...data, dateOfBirth: dayjs(newValue).format('MM/DD/YYYY') });
  };

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const minAge = 8;
  const maxAge = 100;

  const isDisabledBtn = useMemo(
    () =>
      !data.fullName.trim().length ||
      !data.dateOfBirth.trim().length ||
      !data.email.trim().length ||
      !data.password.trim().length ||
      !data.repeatPassword.trim().length,
    [data.fullName, data.dateOfBirth, data.email, data.password, data.repeatPassword],
  );

  const checkValidation = () => {
    setHasError((prev) => ({
      ...prev,
      hasFullNameError: !regexFullName.test(data.fullName),
      hasEmailError: !regexEmail.test(data.email),
      hasPasswordError: !regexPassword.test(data.password),
      hasRepeatPasswordError: data.password !== data.repeatPassword,
    }));
  };

  const handleSubmit = () => {
    checkValidation();
  };

  const handleChangeActive = () => {
    setIsActive((current) => !current);
    setData((prev) => ({ ...prev, role: `${isActive ? 'student' : 'teacher'}` }));
  };

  useEffect(() => {
    const isError = Object.values(hasError).includes(true);
    const isEmpty = Object.values(data).includes('');
    if (!isError && !isEmpty) {
      userService.registration(data);
      setData({
        role: 'student',
        fullName: '',
        dateOfBirth: '',
        email: '',
        password: '',
        repeatPassword: '',
      });
    }
  }, [hasError]);

  return (
    <div className={styles.contentWrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.roles}>
          <div className={`${styles.tab} ${isActive ? '' : styles.active}`}>
            <button onClick={handleChangeActive} className={styles.button}>
              <FontAwesomeIcon icon={faGraduationCap} />
              <h2>Student</h2>
            </button>
          </div>
          <div className={`${styles.tab} ${isActive ? styles.active : ''}`}>
            <button onClick={handleChangeActive} className={styles.button}>
              <FontAwesomeIcon icon={faChalkboardUser} />
              <h2>Teacher</h2>
            </button>
          </div>
        </div>
        <div className={styles.topWrap}>
          <h1>Get started with Us</h1>
          <p>Register a new membership</p>
        </div>
        <Box>
          <FormControl margin='normal'>
            <TextField
              error={hasError.hasFullNameError}
              helperText={
                hasError.hasFullNameError
                  ? 'Enter 2 capitalized words; each word has a min of 2 and a max of 16 letters'
                  : ''
              }
              id={`input-with-icon-textfield ${nanoid(5)}`}
              type='text'
              name='fullName'
              value={data.fullName}
              onChange={(e) => handleChange(e)}
              placeholder='Full name'
              color='purple'
              size='small'
              sx={{ m: '10px 0' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FontAwesomeIcon icon={faUser} fill='#a1a4b5' width={12} height={12} />
                  </InputAdornment>
                ),
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                maxDate={`${new Date().getFullYear() - minAge}/12/31`}
                minDate={`${new Date().getFullYear() - maxAge}/12/31`}
                inputFormat='DD/MM/YYYY'
                value={data.dateOfBirth}
                onChange={handleDateChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FontAwesomeIcon icon={faCakeCandles} fill='#a1a4b5' width={12} height={12} />
                    </InputAdornment>
                  ),
                }}
                renderInput={(params) => (
                  <TextField placeholder='Date birth' size='small' color='purple' {...params} />
                )}
              />
            </LocalizationProvider>
            <TextField
              error={hasError.hasEmailError}
              helperText={
                hasError.hasEmailError
                  ? 'Please enter a valid email address; examples: cockroaches@gmail.com'
                  : ''
              }
              id={`input-with-icon-textfield ${nanoid(5)}`}
              type='email'
              name='email'
              value={data.email}
              onChange={(e) => handleChange(e)}
              placeholder='Email'
              color='purple'
              size='small'
              sx={{ m: '10px 0' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FontAwesomeIcon icon={faEnvelope} fill='#a1a4b5' width={12} height={12} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={hasError.hasPasswordError}
              helperText={
                hasError.hasPasswordError
                  ? 'Enter min 8 and max 10 characters; example: Jerry77)'
                  : ''
              }
              id={`input-with-icon-textfield ${nanoid(5)}`}
              type='password'
              name='password'
              value={data.password}
              onChange={(e) => handleChange(e)}
              placeholder='Password'
              color='purple'
              size='small'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={hasError.hasRepeatPasswordError}
              helperText={
                hasError.hasRepeatPasswordError ? 'Incorrect! Your passwords is not the same' : ''
              }
              id={`input-with-icon-textfield ${nanoid(5)}`}
              type='password'
              name='repeatPassword'
              value={data.repeatPassword}
              onChange={(e) => handleChange(e)}
              placeholder='Repeat password'
              color='purple'
              size='small'
              sx={{ width: '500px', m: '10px 0' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              disabled={isDisabledBtn}
              onClick={handleSubmit}
              type='submit'
              variant='contained'
              sx={{ margin: '15px 0', bgcolor: '#7c08ff' }}
            >
              Register
            </Button>
          </FormControl>
        </Box>
        <div className={styles.bottomWrap}>
          <p>Already have an account?</p>
          <Link className={styles.link} to='/login'>
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
