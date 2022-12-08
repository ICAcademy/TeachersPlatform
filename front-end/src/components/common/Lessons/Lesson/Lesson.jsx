import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './Lesson.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

//Components
import FirstLetterIcon from 'components/common/FirstLetterIcon/FirstLetterIcon';

const Lesson = (props) => {
  const showLessonBodyHandler = () => {
    props.onChange(props.lesson);
  };

  const { title } = props.lesson;
  return (
    <div
      className={`${styles.lesson} ${props.selectedLesson === props.lesson ? styles.active : ''}`}
      onClick={showLessonBodyHandler}
    >
      <div className={styles.lessonBody}>
        <div className={styles.lessonInfo}>
          <FirstLetterIcon firstLetter={props.index} />
          <div className={styles.lessonTitle}>{title}</div>
        </div>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};

//propTypes
Lesson.propTypes = {
  lesson: PropTypes.object,
  onChange: PropTypes.func,
  selectedLesson: PropTypes.object,
  index: PropTypes.string,
};
Lesson.defaultProps = {
  lesson: {},
  selectedLesson: {},
  index: '1',
};

export default Lesson;
