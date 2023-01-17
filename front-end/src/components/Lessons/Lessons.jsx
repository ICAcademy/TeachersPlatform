import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

//Styles
import styles from './Lessons.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';

//Components
import Lesson from './Lesson/Lesson';
import LessonsHeader from './LessonsHeader/LessonsHeader';
import LessonBody from './LessonBody/LessonBody';

const Lessons = (props) => {
  const [selectedLesson, setSelectedLesson] = useState({});
  const [fullScreen, setFullScreen] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (lesson) => {
    setSelectedLesson(lesson);
  };

  const fullScreenHandler = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <React.Fragment>
      <div className={`${styles.lessonsColumn} ${styles.w40} ${fullScreen ? styles.closed : ''}`}>
        <LessonsHeader
          level={props.level}
          title={props.unit}
          numberOfLessons={props.lessons.length}
        />
        <div className={styles.beforeLessons}>
          <h3>Lessons</h3>
          <div className={styles.backBtn} onClick={() => navigate(-1)}>
            Back to materials
          </div>
        </div>
        <div className={styles.lessonsWrap}>
          {props.lessons.map((lesson, index) => (
            <Lesson
              key={index}
              index={`${index + 1}`}
              lesson={lesson}
              selectedLesson={selectedLesson}
              onChange={onChangeHandler}
            />
          ))}
        </div>
      </div>
      {selectedLesson.layout && (
        <div
          className={`${styles.lessonsColumn} ${styles.w60} ${fullScreen ? styles.fullScreen : ''}`}
        >
          <div className={styles.arrow} onClick={fullScreenHandler}>
            <FontAwesomeIcon icon={faArrowsLeftRightToLine} />
          </div>
          <LessonBody
            layout={selectedLesson.layout}
            title={selectedLesson.title}
            fullScreen={fullScreen}
            onChangeFullScreen={fullScreenHandler}
          />
        </div>
      )}
    </React.Fragment>
  );
};

//propTypes
Lessons.propTypes = {
  lessons: PropTypes.array,
  unit: PropTypes.string,
  level: PropTypes.string,
};

Lessons.defaultProps = {
  lessons: [],
  unit: '',
  level: '',
};

export default Lessons;
