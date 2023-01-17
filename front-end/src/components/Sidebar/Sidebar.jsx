import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { SidebarList } from 'components/SidebarList/SidebarList';
import MobileHeader from 'components/common/MobileHeader/MobileHeader';

import { CurrentUserContext } from 'context/AppProvider';

import styles from './Sidebar.module.scss';

// Assets
import logo1 from 'assets/sidebar/logo-letter.png';
import avatar from 'assets/sidebar/avatar.png';

export const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [open, setOpen] = useState(false);

  const showSidebarHandler = (state) => {
    setOpen(state);
  };

  return (
    <>
      <MobileHeader showSidebar={showSidebarHandler} sidebarState={open} />
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.sidebarImgHolder}>
          <div className={styles.sidebarImgBlock}>
            <Link to='/'>
              <img src={logo1} alt='logo' width='30px' />
            </Link>
            <Link to='/'>
              <span className={styles.sidebarLogoText}>Inter School</span>
            </Link>
          </div>
        </div>
        <div className={styles.sidebarImgAvatar}>
          <Link
            to='profile/general-info'
            state={'general-info'}
            className={styles.sidebarAvatarLink}
          >
            <img src={currentUser.url || avatar} alt='logo' className={styles.sidebarAvatar} />
          </Link>
          <Typography variant='h6' align='center'>
            {currentUser.fullName}
            <span className={styles.sidebarRole}>{currentUser.role}</span>
          </Typography>
        </div>
        <SidebarList showSidebar={showSidebarHandler} />
      </aside>
    </>
  );
};

export default Sidebar;
