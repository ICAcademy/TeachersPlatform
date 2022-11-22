import React, { useState, useMemo, useEffect } from 'react';
import { FormControl, TextField, Box, Button, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

// Regex
import { regexFullName, regexPassword } from 'helpers/regex';

// Styles
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const [hasError, setHasError] = useState({
    hasUsernameError: false,
    hasPasswordError: false,
  });

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const isDisabledBtn = useMemo(
    () => !data.username.trim().length || !data.password.trim().length,
    [data.username, data.password],
  );

  const checkValidation = () => {
    setHasError((prev) => ({
      ...prev,
      hasUsernameError: !regexFullName.test(data.fullName),
      hasPasswordError: !regexPassword.test(data.password),
    }));
  };

  const handleSubmit = () => {
    checkValidation();
  };

  console.log(hasError);

  useEffect(() => {
    const isError = Object.values(hasError).includes(true);
    const isEmpty = Object.values(data).includes('');
    if (!isError && !isEmpty) {
      console.log('useEffect');
      // sendUserData(data);
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
    <div className={styles.wrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.topWrap}>
          <h1>Let&apos;s Get Started</h1>
          <p>Sign in to continue to edulearn.</p>
        </div>
        <Box>
          <FormControl sx={{ width: '400px' }}>
            <TextField
              id={`input-with-icon-textfield ${nanoid(5)}`}
              type='text'
              name='username'
              error={hasError.hasUsernameError}
              helperText={hasError.hasUsernameError ? 'Wrong username! Please try again' : ''}
              value={data.username}
              onChange={(e) => handleChange(e)}
              placeholder='Username'
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
            <TextField
              id={`input-with-icon-textfield ${nanoid(5)}`}
              type='password'
              name='password'
              error={hasError.hasPasswordError}
              helperText={hasError.hasPasswordError ? 'Wrong password! Please try again' : ''}
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
            <Button
              disabled={isDisabledBtn}
              onClick={handleSubmit}
              type='submit'
              variant='contained'
              sx={{ margin: '15px 0', bgcolor: '#7c08ff' }}
            >
              Sign in
            </Button>
          </FormControl>
        </Box>
        <div className={styles.bottomWrap}>
          <p>Already have an account?</p>
          <Link className={styles.link} to='/registration'>
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
