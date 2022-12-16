import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// components
import { Button } from '@mui/material';

// styles
import styles from './MobileMenu.module.scss';

const MobileMenu = ({ handleShowMenu }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <Button onClick={handleShowMenu}>Close Menu</Button>
        </div>
        <div className={styles.navigate}>
          <nav className={styles.menuContainer}>
            <ul className={styles.menu}>
              <li className={styles.itemMenu}>
                <Link className={styles.sign} to='*'>
                  Home
                </Link>
              </li>
              <li className={styles.itemMenu}>
                <Link className={styles.sign} to='*'>
                  Course
                </Link>
              </li>
              <li className={styles.itemMenu}>
                <Link className={styles.sign} to='*'>
                  Pages
                </Link>
              </li>
              <li className={styles.itemMenu}>
                <Link className={styles.sign} to='*'>
                  Blog
                </Link>
              </li>
              <li className={styles.itemMenu}>
                <Link className={styles.sign} to='*'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  handleShowMenu: PropTypes.func,
};

export default MobileMenu;
