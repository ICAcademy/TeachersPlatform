import React from 'react';
import PropTypes from 'prop-types';

// components
import Box from '@mui/material/Box';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// styles
import styles from './TeacherPhone.module.scss';

const TeacherPhone = ({ phoneInput, setPhoneInput }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>Phone</span>
      </div>
      <Box className={styles.box}>
        <PhoneInput value={phoneInput} onChange={setPhoneInput} />
      </Box>
    </div>
  );
};

TeacherPhone.propTypes = {
  phoneInput: PropTypes.string,
  setPhoneInput: PropTypes.func,
};

export default TeacherPhone;
