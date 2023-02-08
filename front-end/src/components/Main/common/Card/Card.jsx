import React from 'react';
import PropTypes from 'prop-types';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Card.module.scss';

const Card = ({ img, header, info }) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <FontAwesomeIcon icon={img} className={styles.dollar} />
      </div>
      <div>
        <h3 className={styles.title}>{header}</h3>
      </div>
      <div className={styles.explanationContainer}>
        <p className={styles.explanation}>{info}</p>
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

Card.propTypes = {
  img: PropTypes.object,
  header: PropTypes.string,
  info: PropTypes.string,
};

export default Card;
