import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './Explanation.module.scss';

const Explanation = ({ explanation }) => {
  return <p className={styles.explanation}>{explanation}</p>;
};

Explanation.propTypes = {
  explanation: PropTypes.string,
};

export default Explanation;
