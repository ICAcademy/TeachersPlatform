import React from 'react';
import PropTypes from 'prop-types';

// components
import { TextField } from '@mui/material';

// styles
import styles from './AgePreferences.module.scss';

const AgePreferences = ({ minAge, setMinAge, maxAge, setMaxAge, error }) => {
  const changeMinAge = (event) => {
    setMinAge(event.target.value);
  };

  const changeMaxAge = (event) => {
    setMaxAge(event.target.value);
  };

  const errorShow = (age) => {
    if (age === '') {
      return 'Empty field!';
    } else if (age < 0) {
      return 'Age can not be less than zero';
    }

    return '';
  };

  const errMin = errorShow(minAge);
  const errMax = errorShow(maxAge);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>Age Preferences</span>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.minAgeContainer}>
          <TextField
            className={styles.input}
            inputProps={{ min: 0, max: 90 }}
            value={minAge}
            onChange={changeMinAge}
            type='number'
            label='Min Age'
            size='small'
            error={error}
            helperText={error && errMin}
          />
        </div>
        <span className={styles.range}>-</span>
        <div className={styles.maxAgeContainer}>
          <TextField
            className={styles.input}
            inputProps={{ min: 0, max: 90 }}
            value={maxAge}
            onChange={changeMaxAge}
            type='number'
            label='Max Age'
            size='small'
            error={error}
            helperText={error && errMax}
          />
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
  error: PropTypes.bool,
};

export default AgePreferences;
