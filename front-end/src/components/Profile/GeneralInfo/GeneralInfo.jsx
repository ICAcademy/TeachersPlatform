import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import styles from './GeneralInfo.module.scss';
import userImg from 'assets/sidebar/avatar.png';

const minAge = 8;
const maxAge = 100;

const sx = {
  profileItem: {
    '&:hover': {
      '& > .MuiInputLabel-root': { color: 'primary.main' },
    },
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': { borderColor: 'primary.main', borderWidth: '2px' },
    },
  },
  saveBtn: { maxWidth: '100px', ml: 'auto' },
};

const GeneralInfo = () => {
  return (
    <>
      <Box component='img' src={userImg} alt='User photo' className={styles.profile__img} />
      <Button>Change profile photo</Button>
      <Box className={styles.profile__content}>
        <TextField type='text' label='Fullname:' value='Tom Morgan' fullWidth sx={sx.profileItem} />
        <TextField
          type='email'
          label='Email:'
          value='testemai@mail.com'
          fullWidth
          sx={sx.profileItem}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              className={styles.profile__item}
              maxDate={`${new Date().getFullYear() - minAge}/12/31`}
              minDate={`${new Date().getFullYear() - maxAge}/12/31`}
              inputFormat='DD/MM/YYYY'
              value='12/06/1926'
              renderInput={(params) => (
                <TextField
                  {...params}
                  type='date'
                  label='Birth date:'
                  focused
                  color='primary'
                  error={false}
                />
              )}
            />
          </LocalizationProvider> */}
        <Button variant='contained' color='primary' sx={sx.saveBtn}>
          Save
        </Button>
      </Box>
      <Button variant='outlined' color='primary'>
        Change password
      </Button>
    </>
  );
};

export default GeneralInfo;
