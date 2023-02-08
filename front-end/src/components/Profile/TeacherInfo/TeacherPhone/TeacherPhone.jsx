import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// components
import Box from '@mui/material/Box';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// styles
import styles from './TeacherPhone.module.scss';

const TeacherPhone = ({ phoneInput, setPhoneInput }) => {
  const [screen, setScreen] = useState('40%');

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 700px)').matches) {
        setScreen('40%');
      } else {
        setScreen('100%');
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>Phone</span>
      </div>
      <Box className={styles.box}>
        <PhoneInput
          inputStyle={{
            width: screen,
          }}
          value={phoneInput}
          onChange={setPhoneInput}
        />
      </Box>
    </div>
  );
};

TeacherPhone.propTypes = {
  phoneInput: PropTypes.string,
  setPhoneInput: PropTypes.func,
};

export default TeacherPhone;
