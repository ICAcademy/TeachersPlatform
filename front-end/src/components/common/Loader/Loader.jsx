import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Loader.module.scss';

const Loader = ({ isAuthPage }) => {
  return <div className={`${styles.loader} ${isAuthPage ? styles.white : styles.purple}`} />;
};

Loader.propTypes = {
  isAuthPage: PropTypes.bool,
};

Loader.defaultProps = {
  isAuthPage: false,
};

export default Loader;
