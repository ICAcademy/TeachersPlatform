import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@mui/material';

// styles
import styles from './Header.module.scss';

const Header = ({ level, setLevel, unit, setUnit, topic, setTopic }) => {
  const handleChangeInput = (setFunc, event) => {
    setFunc(event.target.value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.itemContainer}>
        <div className={styles.textContainer}>
          <p className={styles.text}>Level</p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            value={level}
            onChange={(event) => handleChangeInput(setLevel, event)}
          />
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.textContainer}>
          <p className={styles.text}>Unit</p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            value={unit}
            onChange={(event) => handleChangeInput(setUnit, event)}
          />
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.textContainer}>
          <p className={styles.text}>Topic</p>
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            value={topic}
            onChange={(event) => handleChangeInput(setTopic, event)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  level: PropTypes.string,
  setLevel: PropTypes.func,
  unit: PropTypes.string,
  setUnit: PropTypes.func,
  topic: PropTypes.string,
  setTopic: PropTypes.func,
};
