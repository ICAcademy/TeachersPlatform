import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './SidebarList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseUser,
  faCalendarDays,
  faSpellCheck,
  faBook,
  faUserGraduate,
  faSackDollar,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

// Services
import { authService } from 'services/authService';

export const SidebarList = () => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.sidebarMenu}>
      <List className={styles.sidebarList}>
        <ListItem className={styles.sidebarItem}>
          <Link to='/app' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faHouseUser} />
            Dashboard
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/app' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faCalendarDays} />
            Calendar
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/app/materials' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faBook} />
            Materials
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/app/questions' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faSpellCheck} />
            Grammar
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/app' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faUserGraduate} />
            Students
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/app' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faSackDollar} />
            Finances
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <NavLink onClick={logout} to='/login' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faRightFromBracket} />
            Logout
          </NavLink>
        </ListItem>
      </List>
    </div>
  );
};
