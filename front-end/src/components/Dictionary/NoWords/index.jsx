import React from 'react';

// Images
import students from 'assets/images/students.svg';

// Styles
import styles from './NoWords.module.scss';

const NoWords = () => (
  <div className={styles.wrapper}>
    <img src={students} />
    <i>
      <h1>You do not have words... but you can create your first word above!</h1>
    </i>
  </div>
);

export default NoWords;
