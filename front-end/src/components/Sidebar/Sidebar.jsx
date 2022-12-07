import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { SidebarList } from 'components/SidebarList/SidebarList';

import { CurrentUserContext } from 'context/AppProvider';

import styles from './Sidebar.module.scss';
import logo from 'assets/sidebar/logo-dark-text.png';
import logo1 from 'assets/sidebar/logo-letter.png';
import avatar from 'assets/sidebar/avatar.png';

export const Sidebar = () => {
  const {
    currentUser: {
      data: { fullName },
    },
  } = useContext(CurrentUserContext);

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarImgHolder}>
          <div className={styles.sidebarImgBlock}>
            <Link to='/home'>
              <img src={logo1} alt='logo' width='30px' />
            </Link>
          </div>
          <div className={styles.sidebarImgBlock}>
            <Link to='/home'>
              <img src={logo} alt='logo' />
            </Link>
          </div>
        </div>
        <div className={styles.sidebarImgAvatar}>
          <Link to='profile/general-info' state={'general-info'}>
            <img src={avatar} alt='logo' className={styles.sidebarAvatar} />
          </Link>
          <Typography variant='h6'>{` Welcome back, ${fullName}`}</Typography>
        </div>
        <SidebarList />
      </aside>
      <Outlet />
    </>
  );
};
