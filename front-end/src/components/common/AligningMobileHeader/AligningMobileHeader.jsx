import React from 'react';
import { Link } from 'react-router-dom';

// assets
import logo from 'assets/images/logo.png';

// styles
import styles from './AligningMobileHeader.module.scss';

const AligningMobileHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <div className={styles.logoContainer}>
            <Link to='/'>
              <img className={styles.logo} src={logo} alt='logo' />
            </Link>
          </div>
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
        <div className={styles.buttonsContainer}>
          <div className={styles.logInOutContainer}>
            <Link className={styles.logInOut} to='/login'>
              Log In
            </Link>
          </div>
          <div className={styles.logInOutContainer}>
            <Link className={styles.logInOut} to='/registration'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AligningMobileHeader;
