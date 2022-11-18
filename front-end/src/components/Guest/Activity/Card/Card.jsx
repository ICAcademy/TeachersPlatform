import React from 'react';

// components
import Explanation from 'components/Guest/common/Explanation/Explanation';

// styles
import styles from './Card.module.scss';

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <span className={styles.data}>8</span>
        <span className={styles.data}>nov</span>
      </div>
      <div className={styles.workContainer}>
        <div className={styles.titleContainer}>
          <h4 className={styles.title}>Puplic Speakin in Front Master</h4>
        </div>
        <div className={styles.explanationContainer}>
          <Explanation
            explanation={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

