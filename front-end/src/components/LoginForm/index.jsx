import React from 'react';
import { FormControl, TextField, Box, Button } from '@mui/material';

// Styles
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.blocksWrap}>
        <Box>
          <FormControl>
            <TextField />
            <TextField />
            <Button />
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default LoginForm;
