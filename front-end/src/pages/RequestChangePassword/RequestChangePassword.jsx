import React, { useState } from 'react';

// components
import { Box } from '@mui/system';
import { TextField, InputAdornment, FormControl, Button } from '@mui/material';

// service
import { requestChangePasswordService } from 'services/authService';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './RequestChangePassword.module.scss';

const RequestChangePassword = () => {
  const [email, setEmail] = useState('');

  const hangeChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const requestChangePassword = async (email) => {
    try {
      const changePassword = await requestChangePasswordService(email);
      return changePassword;
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = async () => {
    await requestChangePassword(email);
    setEmail('');
  };

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
              onChange={(event) => hangeChangeEmail(event)}
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
            <Button
              onClick={handleSubmit}
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

export default RequestChangePassword;
