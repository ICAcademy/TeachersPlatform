import React from 'react';

// components
import Card from '../common/Card/Card';
import Title from '../common/Title/Title';
import Topic from '../common/Topic/Topic';
import Explanation from '../common/Explanation/Explanation';

// styles
import styles from './DegreeProgram.module.scss';
import { faBook, faBookmark, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

const DegreeProgram = () => {
  const infoForDegree =
    'Compare the Best Bachelor Degrees Worldwide! Find your Perfect Master Abroad. Never stop learning.';

  const infoForSchool =
    'Finding the right school should not be hard. From K-12 to college to grad school, we make it easy to discover and connect with the best ones for you.';

  const infoForGraduate =
    'The many sources of information create a great chance to get under the skin of that graduate program you find a perfect match.';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topicContainer}>
          <Topic topic={'DEGREE & PROGRAMS'} />
        </div>
        <div>
          <Title title={'What path you will take?'} />
        </div>
        <div className={styles.explanationContainer}>
          <Explanation
            explanation={
              'specific tuition fees will be dependent on yournumber of course credit hours and which faculty or school offers those specific courses.'
            }
          />
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cardContainer}>
            <Card img={faBook} header={'Majors & Bachelors Degree'} info={infoForDegree} />
          </div>
          <div className={styles.cardContainer}>
            <Card img={faBookmark} header={'Colleges & Schools'} info={infoForSchool} />
          </div>
          <div className={styles.cardContainer}>
            <Card img={faUserGraduate} header={'Graduated Programs'} info={infoForGraduate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DegreeProgram;
