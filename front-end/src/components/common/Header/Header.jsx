/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './Header.module.scss';

// Assets
import logo from 'assets/sidebar/logo-letter.png';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.sidebarImgBlock}>
            <Link to='/'>
              <img src={logo} alt='logo' width='30px' />
            </Link>
            <Link to='/'>
              <span className={styles.sidebarLogoText}>Inter School</span>
            </Link>
          </div>
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
      </div>
    </div>
  );
};

export default Header;
