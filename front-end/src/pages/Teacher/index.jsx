import React from 'react';
import { useLocation } from 'react-router-dom';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

// Components
import Tabs from 'components/common/Tabs';
import Overview from 'components/Teacher/Overview';
import Courses from 'components/Teacher/Courses';

// Images
import teacher from 'assets/images/teacher.jpg';
import favourite from 'assets/images/favourite.png';
import certificate from 'assets/images/certificate.png';
import speechBubble from 'assets/images/speechBubble.png';
import reward from 'assets/images/reward.png';

// Styles
import styles from './Teacher.module.scss';

const Teacher = () => {
  const { pathname } = useLocation();
  const tabs = [
    { title: 'Overview', link: '/app/teachers/1/overview' },
    { title: 'Courses', link: '/app/teachers/1/courses' },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.test}>
        <div className={styles.iconsWrap}>
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faLinkedinIn} />
        </div>
        <div className={styles.imageWrap}>
          <img src={teacher} alt='teacher' />
        </div>
        <div className={styles.share}>
          <FontAwesomeIcon icon={faShareNodes} />
          <span>Report This Author</span>
        </div>
      </div>
      <div className={styles.description}>
        <h1>Kaily Parker</h1>
        <span>English Teacher</span>
      </div>
      <div className={styles.test1}>
        <div className={styles.blockWrap}>
          <img src={speechBubble} />
          <span>533 Reviews</span>
        </div>
        <div className={styles.blockWrap}>
          <img src={favourite} />
          <span>4.87 Rating</span>
        </div>
        <div className={styles.blockWrap}>
          <img src={reward} />
          <span>Top teacher</span>
        </div>
        <div className={styles.blockWrap}>
          <img src={certificate} />
          <span>29 courses</span>
        </div>
      </div>
      <button>subscribe</button>
      <div className={styles.tabs}>
        <Tabs list={tabs} />
        {tabs.find((tab) => tab.link === pathname).title === 'Overview' ? (
          <Overview />
        ) : (
          <Courses />
        )}
      </div>
    </div>
  );
};

export default Teacher;
