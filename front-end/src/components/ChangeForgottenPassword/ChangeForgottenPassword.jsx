import React from 'react';
import PropTypes from 'prop-types';

// components
import { Box } from '@mui/system';
import { Button, FormControl, TextField } from '@mui/material';

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
            <span>{error}</span>
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
