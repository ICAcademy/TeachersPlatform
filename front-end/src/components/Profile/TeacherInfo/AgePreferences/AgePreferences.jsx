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
            error={error && minAge === ''}
            helperText={error && minAge === '' ? 'Empty field!' : ' '}
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
            error={error && maxAge === ''}
            helperText={error && maxAge === '' ? 'Empty field!' : ' '}
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
