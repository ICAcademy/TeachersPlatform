import React from 'react';
import { Link } from 'react-router-dom';

// assets
import teacher from '../../../../assets/images/teacher.jpeg';

// styles
import styles from './Card.module.scss';

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.teacherContainer}>
        <img className={styles.teacher} src={teacher} alt='teacher' />
      </div>
      <div className={styles.nameContainer}>
        <Link className={styles.name} to='*'>
          Jenny Wilson
        </Link>
      </div>
      <div className={styles.paymentContainer}>
        <p className={styles.payment}>8,425 Pts</p>
      </div>
    </div>
  );
};

export default Card;
