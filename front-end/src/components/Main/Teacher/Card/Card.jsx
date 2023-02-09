import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// styles
import styles from './Card.module.scss';

const Card = ({ img, name, pts }) => {
  return (
    <div className={styles.container}>
      <div className={styles.teacherContainer}>
        <img className={styles.teacher} src={img} alt='teacher' />
      </div>
      <div className={styles.nameContainer}>
        <Link className={styles.name} to='*'>
          {name}
        </Link>
      </div>
      <div className={styles.paymentContainer}>
        <p className={styles.payment}>{pts}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  pts: PropTypes.string,
};

export default Card;
