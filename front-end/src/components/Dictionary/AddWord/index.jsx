import React from 'react';

// MUI library
import { TextField, Box, Button } from '@mui/material';

// Styles
import styles from './AddWord.module.scss';

const AddWord = () => {
  return (
    <div className={styles.wrapper}>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div className={styles.block}>
          <TextField
            required
            id='outlined-required'
            label='Word'
            size='small'
            align='center'
            defaultValue='Gorgeous'
          />
          <TextField
            required
            id='outlined-required'
            label='Translation'
            size='small'
            align='center'
            defaultValue='Чудовий'
          />
          <Button variant='contained' size='small' sx={{ width: 100, height: 40 }}>
            Add
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddWord;
