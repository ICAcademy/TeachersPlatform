import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse';

// services
import { getAllTeacher } from 'services/teacherService';
import { getAllStudents } from 'services/studentService';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';

// assets
import student1 from '../../../assets/images/student1.png';
import student2 from '../../../assets/images/student2.png';
import student3 from '../../../assets/images/student3.png';
import flatBackground from '../../../assets/images/city.png';
import cloudBig from '../../../assets/images/cloudbig.webp';
import cloudBiggest from '../../../assets/images/cloudbiggest.webp';

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
            <div className={styles.flatBackgroundContainer}>
              <img className={styles.student1} src={flatBackground} />
            </div>
            <MouseParallaxChild className={styles.cloudBigContainer} factorX={0.6} factorY={0.6}>
              <img className={styles.student1} src={cloudBig} />
            </MouseParallaxChild>
            <MouseParallaxChild
              className={styles.cloudBiggestContainer}
              factorX={0.6}
              factorY={0.6}
            >
              <img className={styles.student1} src={cloudBiggest} />
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.cloudBig1Container} factorX={0.6} factorY={0.6}>
              <img className={styles.student1} src={cloudBig} />
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.student1Container} factorX={0.6} factorY={0.6}>
              <img className={styles.student1} src={student1} />
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.student2Container} factorX={0.7} factorY={0.7}>
              <img className={styles.student1} src={student2} />
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.student3Container} factorX={0.5} factorY={0.5}>
              <img className={styles.student1} src={student3} />
            </MouseParallaxChild>
          </div>
        </div>
      )}
    </MouseParallaxContainer>
  );
};

export default Banner;
