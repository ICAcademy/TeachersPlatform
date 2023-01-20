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
import { teacherPhoto } from 'constants/photo';

// Styles
import styles from './Card.module.scss';

const Card = ({ fullName, activity, teacherId, image }) => {
  return (
    <Link to={`/app/teachers/${teacherId}`} className={styles.wrap}>
      <div className={styles.block}>
        <div className={styles.imgBlock}>
          {image ? <img src={image} alt='teacher' /> : <img src={teacherPhoto} alt='teacher' />}
          <div className={styles.iconsWrap}>
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faLinkedinIn} />
          </div>
        </div>
        <div className={styles.description}>
          <h2>{fullName}</h2>
          <span>{activity}</span>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  fullName: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  teacherId: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Card;
