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
      <div>Age Preferences</div>
      <div className={styles.minAgeContainer}>
        <Input value={minAge} onChange={changeMinAge} type='number' />
      </div>
      <span>-</span>
      <div>
        <Input value={maxAge} onChange={changeMaxAge} type='number' />
      </div>
    </div>
  );
};

AgePreferences.propTypes = {
  minAge: PropTypes.number,
  setMinAge: PropTypes.func,
  maxAge: PropTypes.number,
  setMaxAge: PropTypes.func,
};

export default AgePreferences;
