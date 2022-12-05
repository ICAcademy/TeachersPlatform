import React from 'react';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Welcome.module.scss';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.welcomeInfo}>
          <div>
            <span className={styles.university}>University</span>
          </div>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              Welcome to the
              <span className={styles.future}> future </span>
              educations systems
            </h1>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.info}>
              We see a multitude of talents in every child with parents to discover, nurture and
              celebrate each student’s unique gifts.
            </p>
          </div>
          <div className={styles.ourStoryContainer}>
            <div>
              <a className={styles.ourStory} href='*'>
                Our story
              </a>
            </div>
            <div className={styles.arrow}>
              <FontAwesomeIcon icon={faArrowRight} className={styles.faArrowRight} />
            </div>
          </div>
        </div>
        <div className={styles.imagesContainer}>
          <div className={styles.bannerCourseContainer}>
            <h3 className={styles.numbersOfCourses}>70+</h3>
            <span className={styles.course}>Course</span>
          </div>
          <div className={styles.instructorContainer}>
            <div className={styles.instructorImage}>
              <div className={styles.checkContainer}>
                <FontAwesomeIcon icon={faCheck} className={styles.check} />
              </div>
            </div>
            <div className={styles.nameContainer}>
              <h5 className={styles.name}>John Doe</h5>
            </div>
            <div className={styles.professionContainer}>
              <p className={styles.profession}>Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
