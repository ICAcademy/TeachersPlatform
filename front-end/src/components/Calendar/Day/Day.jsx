/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './Day.module.scss';

const Day = ({ day }) => {
  return <div className={styles.day}>{day.format()}</div>;
};

export default Day;
