import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Timer.module.scss';

const Timer = ({ running }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      return;
    }
    clearInterval(interval);
    return () => clearInterval(interval);
  }, [running]);

  const minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
  const seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2);

  return (
    <div className={styles.timer}>
      <div className={styles.number}>
        <span>{`${minutes}:`}</span>
        <span>{`${seconds}`}</span>
      </div>
    </div>
  );
};

Timer.propTypes = {
  running: PropTypes.bool,
};

export default Timer;
