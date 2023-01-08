import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// MUI library
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { pendingSubscriptionsCount } from 'store/pending-subscriptions-slice';

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
  faBell,
} from '@fortawesome/free-solid-svg-icons';

// Services
import { logout } from 'services/authService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './SidebarList.module.scss';
import Badge from '@mui/material/Badge';

export const SidebarList = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const { subscriptions } = useSelector((state) => state.approveStudent);

  const dispatchFunction = useDispatch();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    dispatchFunction(pendingSubscriptionsCount());
  });

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
            <Badge badgeContent={subscriptions} color='primary' className={styles.sidebarBadge}>
              <Link to='/app/subscriptions' className={styles.sidebarLink}>
                <FontAwesomeIcon className={styles.sidebarIcon} icon={faUserGraduate} />
                Students
              </Link>
              {subscriptions > 0 && <div className={styles.pulseWave}></div>}
            </Badge>
          )}
        </ListItem>
        {currentUser?.role === 'student' && (
          <ListItem className={styles.sidebarItem}>
            <Link to='/app/subscriptions' className={styles.sidebarLink}>
              <FontAwesomeIcon className={styles.sidebarIcon} icon={faBell} />
              Subscriptions
            </Link>
          </ListItem>
        )}
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
