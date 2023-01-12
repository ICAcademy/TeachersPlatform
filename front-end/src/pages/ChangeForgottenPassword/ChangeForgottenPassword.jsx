import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// components
import { Box } from '@mui/system';

// service
import { resetPasswordService } from 'services/authService';

// styles
import styles from './ChangeForgottenPassword.module.scss';
import { Button, FormControl, TextField } from '@mui/material';

const ChangeForgottenPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const changePassword = async () => {
    try {
      const changePassword = await resetPasswordService(token, id, password);
      return changePassword;
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = async () => {
    await changePassword();
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.topWrap}>
          <h1 className={styles.topWrapHeader}>Change your password, please</h1>
        </div>
        <Box>
          <FormControl sx={{ width: '400px' }}>
            <TextField value={password} onChange={handleChangePassword} />
            <TextField value={confirmPassword} onChange={handleChangeConfirmPassword} />
            <Button
              onClick={handleSubmit}
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

export default ChangeForgottenPassword;
