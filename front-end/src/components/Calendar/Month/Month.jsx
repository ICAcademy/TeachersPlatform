import React from 'react';
import PropTypes from 'prop-types';

import Day from '../Day/Day';

import styles from './Month.module.scss';

const Month = ({ monthMatrix, currentMonth }) => {
  return (
    <div className={styles.month}>
      {monthMatrix.map((week) =>
        week.map((day, i) => <Day key={i} day={day} monthIdx={currentMonth} />),
      )}
    </div>
  );
};

Month.propTypes = {
  monthMatrix: PropTypes.array,
  currentMonth: PropTypes.string,
};

export default Month;
