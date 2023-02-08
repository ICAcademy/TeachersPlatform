import React from 'react';

// components
import Explanation from '../common/Explanation/Explanation';
import Title from '../common/Title/Title';
import Topic from '../common/Topic/Topic';
import Card from './Card/Card';

// assets
import teacher from 'assets/images/teacher.jpeg';
import tomMorgan from 'assets/images/tomMorgan.avif';
import bettyWhite from 'assets/images/bettyWhite.webp';

// styles
import styles from './Teacher.module.scss';

const Teacher = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topicContainer}>
          <Topic topic={'teacher'} />
        </div>
        <div className={styles.titleContainer}>
          <Title title={'Our Best Teachers'} />
        </div>
        <div className={styles.explanationContainer}>
          <Explanation
            explanation={
              'would love to become a teacher in the future. They do really hard work in their working life. Teaching is not an easy job. Everyone loves good teachers'
            }
          />
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cardContainer}>
            <Card img={teacher} name={'Jenny Wilson'} pts={'8,425 Pts'} />
          </div>
          <div className={styles.cardContainer}>
            <Card img={tomMorgan} name={'Tom Morgan'} pts={'7,324 Pts'} />
          </div>
          <div className={styles.cardContainer}>
            <Card img={bettyWhite} name={'Betty White'} pts={'6,231 Pts'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
