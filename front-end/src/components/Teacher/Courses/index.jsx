import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Courses.module.scss';

const Courses = ({ information }) => {
  return (
    <div className={styles.wrap}>
      <p>{information}</p>
    </div>
  );
};

Courses.propTypes = {
  information: PropTypes.string.isRequired,
};

export default Courses;
