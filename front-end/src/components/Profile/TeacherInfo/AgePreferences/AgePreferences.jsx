import React from 'react';
import PropTypes from 'prop-types';

// components
import { Input } from '@mui/material';

// styles
import styles from './AgePreferences.module.scss';

const AgePreferences = ({ minAge, setMinAge, maxAge, setMaxAge }) => {
  const changeMinAge = (event) => {
    setMinAge(event.target.value);
  };

  const changeMaxAge = (event) => {
    setMaxAge(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>Age Preferences</span>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.minAgeContainer}>
          <Input value={minAge} onChange={changeMinAge} type='number' />
        </div>
        <span className={styles.range}>-</span>
        <div className={styles.maxAgeContainer}>
          <Input value={maxAge} onChange={changeMaxAge} type='number' />
        </div>
      </div>
    </div>
  );
};

AgePreferences.propTypes = {
  minAge: PropTypes.string,
  setMinAge: PropTypes.func,
  maxAge: PropTypes.string,
  setMaxAge: PropTypes.func,
};

export default AgePreferences;
