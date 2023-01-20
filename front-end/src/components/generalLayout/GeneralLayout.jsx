import React from 'react';
import styles from './GeneralLayout.module.scss';
import Sidebar from 'components/Sidebar/Sidebar';
import { Outlet } from 'react-router';
//import MeetRoom from 'components/MeetRoom/MeetRoom';

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
