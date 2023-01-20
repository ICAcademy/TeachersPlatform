import React from 'react';

// components
import Banner from 'components/Dashboard/Banner/Banner';

// styles
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={styles.content}>
      <Banner />
    </div>
  );
};

export default Dashboard;
