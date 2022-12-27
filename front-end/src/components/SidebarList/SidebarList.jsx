import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// MUI library
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseUser,
  faCalendarDays,
  faSpellCheck,
  faBook,
  faUserGraduate,
  faSackDollar,
  faRightFromBracket,
  faChalkboardUser,
} from '@fortawesome/free-solid-svg-icons';

// Services
import { logout } from 'services/authService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './SidebarList.module.scss';

export const SidebarList = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  const handleLogout = () => {
    logout();
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
          {currentUser?.role === 'student' ? (
            <Link to='/app/teachers' className={styles.sidebarLink}>
              <FontAwesomeIcon className={styles.sidebarIcon} icon={faChalkboardUser} />
              Teachers
            </Link>
          ) : (
            <Link to='/app/students' className={styles.sidebarLink}>
              <FontAwesomeIcon className={styles.sidebarIcon} icon={faUserGraduate} />
              Students
            </Link>
          )}
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/app/finances' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faSackDollar} />
            Finances
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <NavLink onClick={handleLogout} to='/login' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faRightFromBracket} />
            Logout
          </NavLink>
        </ListItem>
      </List>
    </div>
  );
};
