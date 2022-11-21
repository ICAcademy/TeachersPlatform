import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import styles from './SidebarList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseUser,
  faCalendarDays,
  faSpellCheck,
  faBook,
  faUserGraduate,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';

export const SidebarList = () => {
  return (
    <div className='sidebarMenu'>
      <List className={styles.sidebarList}>
        <ListItem className={styles.sidebarItem}>
          <Link to='/home' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faHouseUser} />
            Dashboard
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/home' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faCalendarDays} />
            Calendar
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/home' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faBook} />
            Materials
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/home' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faSpellCheck} />
            Grammar
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/home' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faUserGraduate} />
            Students
          </Link>
        </ListItem>
        <ListItem className={styles.sidebarItem}>
          <Link to='/home' className={styles.sidebarLink}>
            <FontAwesomeIcon className={styles.sidebarIcon} icon={faSackDollar} />
            Finances
          </Link>
        </ListItem>
      </List>
    </div>
  );
};