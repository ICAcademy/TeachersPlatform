import React from 'react';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';

// Images
import students from 'assets/images/students.svg';

// Styles
import styles from './NoStudents.module.scss';

const NoStudents = () => {
  return (
    <div className={styles.wrapper}>
      <img src={students} />
      <h1>
        <i>
          You don&apos;t have students
          <FontAwesomeIcon icon={faFaceSmileWink} />
        </i>
      </h1>
    </div>
  );
};

export default NoStudents;
