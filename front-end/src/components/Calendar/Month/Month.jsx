/* eslint-disable react/prop-types */
import React from 'react';

import styles from './Month.module.scss';
import Day from '../Day/Day';

const Month = ({ month }) => {
  return (
    <div className={styles.month}>
      {month.map((week) => week.map((day, i) => <Day key={i} day={day} />))}
    </div>
  );
};

export default Month;
