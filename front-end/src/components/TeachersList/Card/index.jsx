import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

const Card = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const clickHandler = () => {
    navigate(`/app/techers/${id}/overview`);
  };
  return (
    <div className={styles.wrap} onClick={clickHandler}>
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
        <h2>Kaily Parker</h2>
        <span>English Teacher</span>
      </div>
    </div>
  );
};

export default Card;
