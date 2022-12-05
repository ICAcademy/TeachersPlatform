import React from 'react';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Card.module.scss';

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <FontAwesomeIcon icon={faDollarSign} className={styles.dollar} />
      </div>
      <div>
        <h3 className={styles.title}>Scolarships</h3>
      </div>
      <div className={styles.explanationContainer}>
        <p className={styles.explanation}>
          ScholarshipPortal is the best scholarship website for international students looking to
          meet their financial needs.
        </p>
      </div>
      <div className={styles.learnMoreContainer}>
        <a className={styles.learnMore} href='*'>
          Learn more
        </a>
        <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
      </div>
    </div>
  );
};

export default Card;
