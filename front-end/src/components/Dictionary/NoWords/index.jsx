import React from 'react';
import PropTypes from 'prop-types';

// Images
import students from 'assets/images/students.svg';

// Styles
import styles from './NoWords.module.scss';

const NoWords = ({ text }) => (
  <div className={styles.wrapper}>
    <img src={students} />
    <i>
      <h1>{text}</h1>
    </i>
  </div>
);

NoWords.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NoWords;
