import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './LessonBody.module.scss';

const LessonBody = (props) => {
  return (
    <div className={styles.lessonBody}>
      <h2>{props.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: props.layout }} />
    </div>
  );
};

//propTypes
LessonBody.propTypes = {
  layout: PropTypes.string,
  title: PropTypes.string,
};
LessonBody.defaultProps = {
  layout: '',
  title: '',
};

export default LessonBody;
