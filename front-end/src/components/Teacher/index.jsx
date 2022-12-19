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
          <img
            src='https://storage.googleapis.com/teachers-platform-40cbe.appspot.com/f53bdc08d852eafe73d86a7c78847814.jpg'
            alt='teacher'
          />
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
          <img src='https://storage.googleapis.com/teachers-platform-40cbe.appspot.com/e5b18e70845a38cb3232b3625f2f40f9.png' />
          <span>533 Reviews</span>
        </div>
        <div className={styles.blockWrap}>
          <img src='https://storage.googleapis.com/teachers-platform-40cbe.appspot.com/6348cab9ae1731006830a3038b3d8307.png' />
          <span>4.87 Rating</span>
        </div>
        <div className={styles.blockWrap}>
          <img src='https://storage.googleapis.com/teachers-platform-40cbe.appspot.com/98b97666f6c95bd43254eafbbe7323d4.png' />
          <span>Top teacher</span>
        </div>
        <div className={styles.blockWrap}>
          <img src='https://storage.googleapis.com/teachers-platform-40cbe.appspot.com/d6998e046da9e942befb99ecf88eaa74.png' />
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
