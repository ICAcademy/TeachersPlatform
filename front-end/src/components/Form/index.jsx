import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  FormControl,
  TextField,
  Box,
  InputAdornment,
  Button,
} from '@mui/material';
import { AdapterDayjs  } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Styles
import styles from './Form.module.scss';

// Icons
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as CakeIcon } from 'assets/icons/cake.svg';
import { ReactComponent as LetterIcon } from 'assets/icons/letter.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';


const Form = () => {
  const [value, setValue] = useState(dayjs(Date.now()));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.contentWrap}>
      <div className={styles.blocksWrap}>
        <div className={styles.topWrap}>
          <h1>Get started with Us</h1>
          <p>Register a new membership</p>
        </div>
        <Box>
          <FormControl>
            <TextField
              id="input-with-icon-textfield"
              type="text"
              placeholder="Full name"
              color="purple"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UserIcon fill="#a1a4b5" width={15} height={15} />
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "10px 0" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                inputFormat="MM/DD/YYYY"
                placeholder="Date birth"
                value={value}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CakeIcon fill="#a1a4b5" width={15} height={15} />
                    </InputAdornment>
                  ),
                }}
                renderInput={(params) => <TextField size="small" color="purple" margin="10px 0" {...params} />}
                />
            </LocalizationProvider>
            <TextField
              id="input-with-icon-textfield"
              type="email"
              placeholder="Email"
              color="purple"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LetterIcon fill="#a1a4b5" width={15} height={15} />
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "10px 0" }}
              />
            <TextField
              id="input-with-icon-textfield"
              type="password"
              placeholder="Password"
              color="purple"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fill="#a1a4b5" width={15} height={15} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="input-with-icon-textfield"
              type="password"
              placeholder="Retype password"
              color="purple"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fill="#a1a4b5" width={15} height={15} />
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "10px 0", width: "450px" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: "15px 0", bgcolor: "#7c08ff" }}
            >
              Register
            </Button>
          </FormControl>
        </Box>
        <div className={styles.bottomWrap}>
          <p>Already have an account?</p>
          <Link className={styles.link} to="/">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
