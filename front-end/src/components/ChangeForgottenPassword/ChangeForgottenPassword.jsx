import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { Box } from '@mui/system';
import { Button, FormControl, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './ChangeForgottenPassword.module.scss';

const ChangeForgottenPassword = ({
  handleChangePassword,
  handleChangeConfirmPassword,
  handleSubmitChangePassword,
  password,
  confirmPassword,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPaswordConfirm] = useState(false);

  const handleClickShowPassword = (setState, state) => {
    setState(!state);
  };

  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <div className={styles.wrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.topWrap}>
          <h1 className={styles.topWrapHeader}>Change your password, please</h1>
        </div>
        <Box>
          <FormControl sx={{ width: '400px' }}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={password}
              onChange={handleChangePassword}
              placeholder='Password'
              color='purple'
              size='small'
              sx={{ m: '10px 0' }}
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
                      onClick={() => handleClickShowPassword(setShowPassword, showPassword)}
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
            <TextField
              type={showPasswordConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              placeholder='Confirm Password'
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
                      onClick={() =>
                        handleClickShowPassword(setShowPaswordConfirm, showPasswordConfirm)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPasswordConfirm ? (
                        <VisibilityOff sx={{ width: '20px', height: '20px' }} />
                      ) : (
                        <Visibility sx={{ width: '20px', height: '20px' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <span className={styles.error}>{error}</span>
            <Button
              onClick={handleSubmitChangePassword}
              type='submit'
              variant='contained'
              sx={{ margin: '15px 0', bgcolor: '#7c08ff' }}
            >
              Change Password
            </Button>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

ChangeForgottenPassword.propTypes = {
  handleChangePassword: PropTypes.func,
  handleChangeConfirmPassword: PropTypes.func,
  handleSubmitChangePassword: PropTypes.func,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  error: PropTypes.string,
};

export default ChangeForgottenPassword;
