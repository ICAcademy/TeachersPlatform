/* eslint-disable react/prop-types */
import React from 'react';

import styles from './Month.module.scss';
import Day from '../Day/Day';

const Month = ({ monthMatrix, currentMonth }) => {
  return (
    <div className={styles.month}>
      {monthMatrix.map((week) =>
        week.map((day, i) => <Day key={i} day={day} monthIdx={currentMonth} />),
      )}
    </div>
  );
};

export default Month;
