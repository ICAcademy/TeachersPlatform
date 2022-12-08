import React, { useContext, useReducer } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { CurrentUserContext } from 'context/AppProvider';

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

const userReduser = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FULLNAME':
      return { ...state, fullName: action.payload };
    case 'CHANGE_EMAIL':
      return { ...state, email: action.payload };
    case 'CHANGE_BITH_DATE':
      return { ...state, dateOfBirth: action.payload };
    default:
      return state;
  }
};

const GeneralInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [user, dispatchUser] = useReducer(userReduser, currentUser);

  const changeFullname = (e) => {
    dispatchUser({ type: 'CHANGE_FULLNAME', payload: e.target.value });
  };

  const changeEmail = (e) => {
    dispatchUser({ type: 'CHANGE_EMAIL', payload: e.target.value });
  };

  const changeDate = (date) => {
    dispatchUser({ type: 'CHANGE_BITH_DATE', payload: dayjs(date) });
  };

  return (
    <>
      <Box component='img' src={userImg} alt='User photo' className={styles.profile__img} />
      <Button>Change profile photo</Button>
      <Box className={styles.profile__content}>
        <TextField
          type='text'
          label='Fullname:'
          value={user.fullName}
          onChange={changeFullname}
          sx={sx.profileItem}
        />
        <TextField
          type='email'
          label='Email:'
          value={user.email}
          onChange={changeEmail}
          sx={sx.profileItem}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            className={styles.profile__item}
            maxDate={`${new Date().getFullYear() - minAge}/12/31`}
            minDate={`${new Date().getFullYear() - maxAge}/12/31`}
            inputFormat='DD/MM/YYYY'
            value={user.dateOfBirth}
            onChange={changeDate}
            renderInput={(params) => (
              <TextField
                {...params}
                type='date'
                label='Birth date:'
                sx={sx.profileItem}
                error={false}
              />
            )}
          />
        </LocalizationProvider>
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
