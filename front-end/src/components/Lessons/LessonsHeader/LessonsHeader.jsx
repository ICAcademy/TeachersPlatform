import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './LessonsHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const LessonsHeader = (props) => {
  const lessonsCount = props.numberOfLessons ? (
    <div className={`${styles.lessonInfoItem}`}>
      <div className={`${styles.roundedCircle}  ${styles.yellow}`}>
        <FontAwesomeIcon icon={faBook} />
      </div>
      <div className={styles.infoLabel}>
        <h5>Lessons</h5>
        <div className={styles.infoValue}>{props.numberOfLessons}</div>
      </div>
    </div>
  ) : (
    ''
  );

  const teacherStatus = props.teacherStatus === 'online' && (
    <img className={styles.statusItem} src={props.teacherImg} alt='Teacher img' />
  );
  const studentStatus = props.studentStatus === 'online' && (
    <img className={styles.statusItem} src={props.studentImg} alt='Student img' />
  );

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
          {lessonsCount}
        </div>
        <div className={styles.statuses}>
          {teacherStatus}
          {studentStatus}
        </div>
      </div>
    </div>
  );
};

LessonsHeader.propTypes = {
  title: PropTypes.string,
  level: PropTypes.string,
  numberOfLessons: PropTypes.number,
  teacherStatus: PropTypes.string,
  studentStatus: PropTypes.string,
  teacherImg: PropTypes.string,
  studentImg: PropTypes.string,
};
LessonsHeader.defaultProps = {
  title: '',
  level: '',
  numberOfLessons: 0,
  teacherStatus: 'offline',
  studentStatus: 'offline',
  teacherImg: '',
  studentImg: '',
};

export default LessonsHeader;
