import React from 'react';

// Components
import Table from 'components/Students/Table';

// Styles
import styles from './Students.module.scss';

const Students = () => {
  return (
    <div className={styles.wrapper}>
      <Table />
    </div>
  );
};

export default Students;
