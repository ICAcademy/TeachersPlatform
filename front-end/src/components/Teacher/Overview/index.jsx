import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Overview.module.scss';

const Overview = ({ biography }) => {
  return (
    <div className={styles.wrap}>
      <p>{biography}</p>
    </div>
  );
};

Overview.propTypes = {
  biography: PropTypes.string.isRequired,
};

export default Overview;
