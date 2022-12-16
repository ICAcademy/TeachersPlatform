import React from 'react';

// components
import Card from '../common/Card/Card';
import Title from '../common/Title/Title';
import Topic from '../common/Topic/Topic';
import Explanation from '../common/Explanation/Explanation';

// styles
import styles from './DegreeProgram.module.scss';

const DegreeProgram = () => {
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
            <Card />
          </div>
          <div className={styles.cardContainer}>
            <Card />
          </div>
          <div className={styles.cardContainer}>
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DegreeProgram;
