import React from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './Desktop.module.scss';

const Desktop = () => {
  return (
    <>
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
      <div className={styles.buttonsContainer}>
        <div className={styles.logInContainer}>
          <Link className={styles.logIn} to='/login'>
            Log In
          </Link>
        </div>
        <div className={styles.signUpContainer}>
          <Link className={styles.signUp} to='/registration'>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Desktop;
