import React from 'react';

// Images
import teacher from 'assets/images/teacher.jpg';

// Styles
import styles from './Card.module.scss';

const Card = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.test}>
        <img src={teacher} alt='teacher' />
      </div>
      <div className={styles.description}>
        <h2>Kaily Parker</h2>
        <span>English Teacher</span>
      </div>
    </div>
  );
};

export default Card;
