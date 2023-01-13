import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

// MUI library
import { FormControl, TextField, Box, InputAdornment, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCakeCandles,
  faEnvelope,
  faLock,
  faGraduationCap,
  faChalkboardUser,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

// Regex
import { REGEX_EMAIL, REGEX_FULL_NAME, REGEX_PASSWORD } from 'helpers/regex';

// Services
import { registration } from 'services/authService';

// Components
import Loader from 'components/common/Loader/Loader';

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
    hasMessageError: false,
    hasFullNameError: false,
    hasEmailError: false,
    hasPasswordError: false,
    hasRepeatPasswordError: false,
  });

  const [errMessage, setErrMessage] = useState('');

  const [activeTab, setActiveTab] = useState(0);

  const [showPassword, setShowPassword] = useState({ current: false, confirm: false });

  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  const handleMouseDownPassword = (e) => e.preventDefault();

  const handlePasswordChange = (prop) => (e) => {
    setData({ ...data, [prop]: e.target.value });
  };

  const handleClickShowPassword = ({ currentTarget }, value) => {
    setShowPassword({ ...showPassword, [currentTarget.name]: value });
  };

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
    const errors = {
      hasMessageError: errMessage,
      hasFullNameError: !REGEX_FULL_NAME.test(data.fullName),
      hasEmailError: !REGEX_EMAIL.test(data.email),
      hasPasswordError: !REGEX_PASSWORD.test(data.password),
      hasRepeatPasswordError: data.password !== data.repeatPassword,
    };

    setHasError((prev) => ({ ...prev, ...errors }));

    return Object.values(errors).includes(true);
  };

  const handleSubmit = async () => {
    if (!checkValidation()) {
      setIsLoading(true);
      await registerUser(data);
      setIsLoading(false);
    }
  };

  const registerUser = async (userInfo) => {
    try {
      await registration(userInfo);
      history('/login');
      setErrMessage('');
    } catch (err) {
      setIsLoading(false);
      setHasError((prev) => ({ ...prev, hasMessageError: true }));
      setErrMessage(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  const handleChangeActive = (tab) => {
    setActiveTab(tab);
    setData((prev) => ({ ...prev, role: `${tab === 0 ? 'student' : 'teacher'}` }));
  };

  return (
    <div className={styles.contentWrap}>
      {isLoading ? (
        <Loader isAuthPage />
      ) : (
        <div className={styles.blocksWrap}>
          <div className={styles.roles}>
            <div className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}>
              <button onClick={() => handleChangeActive(0)} className={styles.button}>
                <FontAwesomeIcon icon={faGraduationCap} />
                <h2>Student</h2>
              </button>
            </div>
            <div className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}>
              <button onClick={() => handleChangeActive(1)} className={styles.button}>
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
                        <FontAwesomeIcon
                          icon={faCakeCandles}
                          fill='#a1a4b5'
                          width={12}
                          height={12}
                        />
                      </InputAdornment>
                    ),
                  }}
                  renderInput={(params) => (
                    <TextField
                      placeholder='Date birth'
                      size='small'
                      color='purple'
                      {...params}
                      error={false}
                    />
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
                type={showPassword.current ? 'text' : 'password'}
                name='password'
                value={data.password}
                onChange={handlePasswordChange('password')}
                placeholder='Password'
                color='purple'
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FontAwesomeIcon icon={faLock} fill='#a1a4b5' width={12} height={12} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        name='current'
                        aria-label='toggle password visibility'
                        onClick={(e) => handleClickShowPassword(e, !showPassword.current)}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword.current ? (
                          <VisibilityOff sx={{ width: '20px', height: '20px' }} />
                        ) : (
                          <Visibility sx={{ width: '20px', height: '20px' }} />
                        )}
                      </IconButton>
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
                type={showPassword.confirm ? 'text' : 'password'}
                name='repeatPassword'
                value={data.repeatPassword}
                onChange={handlePasswordChange('repeatPassword')}
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
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        name='confirm'
                        aria-label='toggle password visibility'
                        onClick={(e) => handleClickShowPassword(e, !showPassword.confirm)}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword.confirm ? (
                          <VisibilityOff sx={{ width: '20px', height: '20px' }} />
                        ) : (
                          <Visibility sx={{ width: '20px', height: '20px' }} />
                        )}
                      </IconButton>
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
              {errMessage && (
                <div className={styles.error}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    fill='#d57c77'
                    width={12}
                    height={12}
                  />
                  {errMessage}
                </div>
              )}
            </FormControl>
          </Box>
          <div className={styles.bottomWrap}>
            <p>Already have an account?</p>
            <Link className={styles.link} to='/login'>
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
