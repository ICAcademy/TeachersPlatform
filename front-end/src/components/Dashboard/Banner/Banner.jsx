import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse';

// services
import { getAllTeacher } from 'services/teacherService';
import { getAllStudents } from 'services/studentService';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Banner.module.scss';
import Loader from 'components/common/Loader/Loader';

const Banner = () => {
  const [countOfStudents, setCountOfStudents] = useState();
  const [countOfTeachers, setCountOfTeachers] = useState();
  const [loading, setLoading] = useState(false);
  const [showMedia, setShowMedia] = useState(true);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 700px)').matches) {
        setShowMedia(true);
      } else {
        setShowMedia(false);
      }
    });
  }, []);

  const getCountOfTeachers = async () => {
    setLoading(true);
    const teachers = await getAllTeacher();
    setCountOfTeachers(teachers.length);
    setLoading(false);
    return teachers;
  };

  const getCountOfStudents = async () => {
    setLoading(true);
    const students = await getAllStudents();
    setCountOfStudents(students.length);
    setLoading(false);
    return students;
  };

  useEffect(() => {
    getCountOfTeachers();
    getCountOfStudents();
  }, []);

  return (
    <MouseParallaxContainer
      className={styles.content}
      globalFactorX={0.3}
      globalFactorY={0.3}
      resetOnLeave
    >
      <div className={styles.left}>
        <div className={styles.info}>
          <div className={styles.headerContainer}>
            <h1 className={styles.learn}>Learn With Effectively With Us!</h1>
          </div>
          <p className={styles.discount}>Get 30% off every course on january.</p>
        </div>
        <div className={styles.countOfUsers}>
          <div className={styles.students}>
            <div className={styles.iconOfStudentsContainer}>
              <FontAwesomeIcon className={styles.iconOfUsers} icon={faGraduationCap} />
            </div>
            <div className={styles.count}>
              <div className={styles.nameOfCount}>Students</div>
              <div className={styles.totalCount}>
                {loading ? (
                  <Loader />
                ) : (
                  <div>
                    <CountUp end={countOfStudents} />
                    <span>+</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.teachers}>
            <div className={styles.iconOfTeachersContainer}>
              <FontAwesomeIcon className={styles.iconOfUsers} icon={faUser} />
            </div>
            <div className={styles.count}>
              <div className={styles.nameOfCount}>Expert Mentors</div>
              <div className={styles.totalCount}>
                {loading ? (
                  <Loader />
                ) : (
                  <div>
                    <CountUp end={countOfTeachers} />
                    <span>+</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMedia && (
        <div className={styles.right}>
          <div className={styles.images}>
            <MouseParallaxChild className={styles.cloud} factorX={0.4} factorY={0.4}>
              <div className={styles.school}></div>
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.layer} factorX={0.2} factorY={0.2}>
              <div className={styles.learnSvg}></div>
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.layer} factorX={0.4} factorY={0.4}>
              <div className={styles.book}></div>
            </MouseParallaxChild>
          </div>
          <div className={styles.images}>
            <MouseParallaxChild className={styles.logoLetterContainer} factorX={0.5} factorY={0.5}>
              <div className={styles.graduater}></div>
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.logoLetterContainer} factorX={0.5} factorY={0.5}>
              <div className={styles.japanese}></div>
            </MouseParallaxChild>
          </div>
        </div>
      )}
    </MouseParallaxContainer>
  );
};

export default Banner;
