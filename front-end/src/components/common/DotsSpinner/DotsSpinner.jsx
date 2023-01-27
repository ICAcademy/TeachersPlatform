import React from 'react';

// Styles
import styles from './DotsSpinner.module.scss';

const DotsSpinner = () => {
  return (
    <div className={styles.dotsWaiting}>
      <div className={styles.dotElastic}></div>
    </div>
  );
};

export default DotsSpinner;
