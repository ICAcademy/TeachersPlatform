import React from 'react';

// Components
import Card from 'components/TeachersList/Card';

// Styles
import styles from './TeachersList.module.scss';

const TeachersList = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Teachers</h1>
      <div className={styles.cardWrap}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default TeachersList;
