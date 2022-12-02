import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

// styles
import styles from './Header.module.scss';

const Header = ({ level, setLevel, unit, setUnit, topic, setTopic }) => {
  const handleChangeInput = (setFunc, event) => {
    setFunc(event.target.value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.inputsContainer}>
        <div className={styles.itemContainer}>
          <div className={styles.inputContainer}>
            <TextField
              className={styles.input}
              variant='outlined'
              size='small'
              label='level'
              value={level}
              onChange={(event) => handleChangeInput(setLevel, event)}
            />
          </div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.inputContainer}>
            <TextField
              className={styles.input}
              variant='outlined'
              size='small'
              label='unit'
              value={unit}
              onChange={(event) => handleChangeInput(setUnit, event)}
            />
          </div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.inputContainer}>
            <TextField
              className={styles.input}
              variant='outlined'
              size='small'
              label='topic'
              value={topic}
              onChange={(event) => handleChangeInput(setTopic, event)}
            />
          </div>
        </div>
      </div>
      <div className={styles.logoHeaderContainer}></div>
    </div>
  );
};

export default memo(Header);

Header.propTypes = {
  level: PropTypes.string,
  setLevel: PropTypes.func,
  unit: PropTypes.string,
  setUnit: PropTypes.func,
  topic: PropTypes.string,
  setTopic: PropTypes.func,
};
