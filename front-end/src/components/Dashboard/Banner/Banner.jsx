import React from 'react';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Banner.module.scss';

const Banner = () => {
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <div className={styles.info}>
          <h1 className={styles.learn}>Learn With Effectively With Us!</h1>
          <p className={styles.discount}>Get 30% off every course on january.</p>
        </div>
        <div className={styles.countOfUsers}>
          <div className={styles.students}>
            <div className={styles.iconOfStudentsContainer}>
              <FontAwesomeIcon className={styles.iconOfUsers} icon={faGraduationCap} />
            </div>
            <div className={styles.count}>
              <div className={styles.nameOfCount}>Students</div>
              <div className={styles.totalCount}>75,000+</div>
            </div>
          </div>
          <div className={styles.teachers}>
            <div className={styles.iconOfTeachersContainer}>
              <FontAwesomeIcon className={styles.iconOfUsers} icon={faUser} />
            </div>
            <div className={styles.count}>
              <div className={styles.nameOfCount}>Expert Mentors</div>
              <div className={styles.totalCount}>200+</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>Img</div>
    </div>
  );
};

export default Banner;
