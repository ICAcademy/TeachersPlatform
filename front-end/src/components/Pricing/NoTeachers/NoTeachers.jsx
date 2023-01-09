import React from 'react';

// Styles
import styles from './NoTeachers.module.scss';

const NoTeachers = () => {
  return (
    <div className={styles.noTeachers}>
      <div className={styles.header}>
        <h4>Teacher list is empty</h4>
      </div>
      <div className={styles.body}>To make a payment first you need to subscribe</div>
    </div>
  );
};

export default NoTeachers;
