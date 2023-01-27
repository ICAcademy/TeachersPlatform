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
import studentBoy from '../../../assets/images/student1.png';
import studentGirlAfroAmerican from '../../../assets/images/student2.png';
import studentGirl from '../../../assets/images/student3.png';
import city from '../../../assets/images/city.png';
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
      if (window.matchMedia('(min-width: 1700px)').matches) {
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
    <div className={styles.content}>
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
        <MouseParallaxContainer
          className={styles.right}
          globalFactorX={0.1}
          globalFactorY={0.1}
          resetOnLeave
        >
          <div className={styles.images}>
            <MouseParallaxChild className={styles.cityContainer} factorX={0.15} factorY={0.15}>
              <img className={styles.img} src={city} />
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.cloudBigContainer} factorX={0.08} factorY={0.08}>
              <img className={styles.img} src={cloudBig} />
            </MouseParallaxChild>
            <MouseParallaxChild
              className={styles.cloudBiggestContainer}
              factorX={0.1}
              factorY={0.1}
            >
              <img className={styles.img} src={cloudBiggest} />
            </MouseParallaxChild>
            <MouseParallaxChild className={styles.cloudBig1Container} factorX={0.07} factorY={0.07}>
              <img className={styles.img} src={cloudBig} />
            </MouseParallaxChild>
            <MouseParallaxChild
              className={styles.studentBoyContainer}
              factorX={0.07}
              factorY={0.09}
            >
              <img className={styles.img} src={studentBoy} />
            </MouseParallaxChild>
            <MouseParallaxChild
              className={styles.studentGirlAfroAmericanContainer}
              factorX={0.1}
              factorY={0.08}
            >
              <img className={styles.img} src={studentGirlAfroAmerican} />
            </MouseParallaxChild>
            <MouseParallaxChild
              className={styles.studentGirlContainer}
              factorX={0.09}
              factorY={0.1}
            >
              <img className={styles.img} src={studentGirl} />
            </MouseParallaxChild>
          </div>
        </MouseParallaxContainer>
      )}
    </div>
  );
};

export default Banner;
