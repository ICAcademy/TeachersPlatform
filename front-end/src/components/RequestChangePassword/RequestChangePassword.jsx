import React from 'react';
import PropTypes from 'prop-types';

// components
import { Box } from '@mui/system';
import { TextField, InputAdornment, FormControl, Button } from '@mui/material';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './RequestChangePassword.module.scss';

const RequestChangePassword = ({ handleChangeEmail, handleSubmitEmail, email, error }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.topWrap}>
          <h1 className={styles.topWrapHeader}>Enter your email, please</h1>
        </div>
        <Box>
          <FormControl sx={{ width: '400px' }}>
            <TextField
              type='email'
              name='email'
              value={email}
              onChange={(event) => handleChangeEmail(event)}
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
            <span className={styles.error}>{error}</span>
            <Button
              onClick={handleSubmitEmail}
              type='submit'
              variant='contained'
              sx={{ margin: '15px 0', bgcolor: '#7c08ff' }}
            >
              Send Email
            </Button>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

RequestChangePassword.propTypes = {
  handleChangeEmail: PropTypes.func,
  handleSubmitEmail: PropTypes.func,
  email: PropTypes.string,
  snackbarShowMessage: PropTypes.func,
  error: PropTypes.string,
};

export default RequestChangePassword;
