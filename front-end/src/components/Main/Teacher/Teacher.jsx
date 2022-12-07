import React from 'react';

// components
import Explanation from '../common/Explanation/Explanation';
import Title from '../common/Title/Title';
import Topic from '../common/Topic/Topic';
import Card from './Card/Card';

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

export default Teacher;
