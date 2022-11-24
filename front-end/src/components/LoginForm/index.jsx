import React, { useState, useEffect, useMemo } from 'react';
import { FormControl, TextField, Box, Button, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from 'requests/auth';

// Styles
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    token: '',
  });

  const [message, setMessage] = useState({
    success: '',
    error: '',
  });

  const history = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const isDisabledBtn = useMemo(
    () => !data.email.trim().length || !data.password.trim().length,
    [data.email, data.password],
  );

  const backendResponse = async (userInfo) => {
    try {
      const answer = await loginUser(userInfo);
      if (answer) {
        setData((prev) => ({ ...prev, token: answer.data.token }));
        setMessage((prev) => ({ ...prev, success: answer.data.message }));
      }
    } catch (err) {
      setMessage((prev) => ({ ...prev, error: err.response.data.error }));
    }
  };

  const handleSubmit = () => {
    backendResponse(data);
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history('/home');
    }
  }, []);

  useEffect(() => {
    const isEmpty = Object.values(data).includes('');
    if (!isEmpty && message.success !== '') {
      const cradentials = JSON.stringify(data);
      localStorage.setItem('user', cradentials);
      history('/home');
      setMessage({
        success: '',
        error: '',
      });
      setData((prev) => ({
        ...prev,
        email: '',
        password: '',
      }));
    }
  }, [message]);

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
              error={message.error !== ''}
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
              id={`input-with-icon-textfield ${nanoid(5)}`}
              type='password'
              name='password'
              error={message.error !== ''}
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
            {message.error ? (
              <div className={styles.error}>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  fill='#d57c77'
                  width={12}
                  height={12}
                />
                {`
                ${message.error}
                `}
              </div>
            ) : (
              <div className={styles.success}>
                {`
                ${message.success}
                `}
              </div>
            )}
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
