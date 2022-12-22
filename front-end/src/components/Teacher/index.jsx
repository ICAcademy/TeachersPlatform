import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

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

// Styles
import styles from './Teacher.module.scss';
import { teacher, certificate, favourite, reward, speechBubble } from 'constants/photo';

const Teacher = ({ fullName, activity, id, overview, courses }) => {
  const { pathname } = useLocation();
  const tabs = [
    { title: 'Overview', link: `/app/teachers/${id}/overview` },
    { title: 'Courses', link: `/app/teachers/${id}/courses` },
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
        <h1>{fullName}</h1>
        <span>{activity}</span>
      </div>
      <div className={styles.test1}>
        <div className={styles.blockWrap}>
          <img src={speechBubble} alt='speechBubble' />
          <span>533 Reviews</span>
        </div>
        <div className={styles.blockWrap}>
          <img src={favourite} alt='favourite' />
          <span>4.87 Rating</span>
        </div>
        <div className={styles.blockWrap}>
          <img src={reward} alt='reward' />
          <span>Top teacher</span>
        </div>
        <div className={styles.blockWrap}>
          <img src={certificate} alt='certificate' />
          <span>29 courses</span>
        </div>
      </div>
      <button>subscribe</button>
      <div className={styles.tabs}>
        <Tabs list={tabs} />
        {tabs?.find((tab) => tab.link === pathname)?.title === 'Overview' ? (
          <Overview biography={overview} />
        ) : (
          <Courses information={courses} />
        )}
      </div>
    </div>
  );
};

Teacher.propTypes = {
  fullName: PropTypes.string,
  activity: PropTypes.string.isRequired,
  id: PropTypes.string,
  overview: PropTypes.string.isRequired,
  courses: PropTypes.string.isRequired,
};

Teacher.defaultProps = {
  fullName: '',
  id: '',
};

export default Teacher;
