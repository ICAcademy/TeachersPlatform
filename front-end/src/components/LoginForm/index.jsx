import React, { useState, useMemo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

// MUI library
import { FormControl, TextField, Box, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

// Services
import { authService } from 'services/authService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { fetchUser } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleEmailChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handlePasswordChange = (prop) => (e) => {
    setData({ ...data, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isDisabledBtn = useMemo(
    () => !data.email.trim().length || !data.password.trim().length,
    [data.email, data.password],
  );

  const loginUser = async (userInfo) => {
    try {
      const {
        data: { token },
      } = await authService.login(userInfo);
      if (token) {
        await fetchUser();
        history('/app');
      }
    } catch (err) {
      setIsError(true);
      console.log(err);
    }
  };

  const handleSubmit = () => {
    loginUser(data);
  };

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
              type='email'
              name='email'
              value={data.email}
              onChange={(e) => handleEmailChange(e)}
              error={isError}
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
              id={`standard-adornment-password ${nanoid(5)}`}
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={data.password}
              onChange={handlePasswordChange('password')}
              error={isError}
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
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
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
              Sign in
            </Button>
            {isError ? (
              <div className={styles.error}>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  fill='#d57c77'
                  width={12}
                  height={12}
                />
                {' Wrong password or email address...'}
              </div>
            ) : (
              ''
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
