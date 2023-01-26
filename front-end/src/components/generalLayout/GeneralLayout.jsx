import React from 'react';
import styles from './GeneralLayout.module.scss';
import Sidebar from 'components/Sidebar/Sidebar';
import { Outlet } from 'react-router';

const GeneralLayout = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </>
  );
};

export default GeneralLayout;
