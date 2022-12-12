import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

// Images
import teacher from 'assets/images/teacher.jpg';

// Styles
import styles from './Card.module.scss';

const Card = ({ fullName, activity, link }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.test}>
        <img src={teacher} alt='teacher' />
        <div className={styles.test1}>
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faLinkedinIn} />
        </div>
      </div>
      <div className={styles.description}>
        <Link to={link}>{fullName}</Link>
        <span>{activity}</span>
      </div>
    </div>
  );
};

Card.propTypes = {
  fullName: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;