import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './LessonsHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const LessonsHeader = (props) => {
  return (
    <div className={styles.lessonHeader}>
      <h1>{props.title}</h1>
      <div className={styles.lessonHeaderInfo}>
        <div className={styles.lessonInfoItem}>
          <div className={`${styles.roundedCircle}  ${styles.red}`}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <div className={styles.infoLabel}>
            <h5>Level</h5>
            <div className={styles.infoValue}>{props.level}</div>
          </div>
        </div>
        <div className={`${styles.lessonInfoItem}`}>
          <div className={`${styles.roundedCircle}  ${styles.yellow}`}>
            <FontAwesomeIcon icon={faBook} />
          </div>
          <div className={styles.infoLabel}>
            <h5>Lessons</h5>
            <div className={styles.infoValue}>{props.numberOfLessons}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

LessonsHeader.propTypes = {
  title: PropTypes.string,
  level: PropTypes.string,
  numberOfLessons: PropTypes.number,
};
LessonsHeader.defaultProps = {
  title: '',
  level: '',
  numberOfLessons: 0,
};

export default LessonsHeader;
