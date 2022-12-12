import React from 'react';

// Styles
import styles from './Overview.module.scss';

const Overview = () => {
  return (
    <div className={styles.wrap}>
      <p>
        My goal is to motivate you to improve your English skills and help you achieve your language
        goals. If you need help getting started with English lessons, look no further!
        <br />
        Some facts about me: I am originally from Washington, DC; I studied business at George Mason
        University; I am a TEFL-certified English teacher; I speak German fluently; I have over ten
        years of experience in the hospitality industry, including opening new restaurants.
      </p>
    </div>
  );
};

export default Overview;
