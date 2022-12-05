/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

// styles
import styles from './Header.module.scss';

// assets
import logo from 'assets/images/logo.png';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Button className={styles.button}>
            <img className={styles.logo} src={logo} alt='logo' />
          </Button>
        </div>
        <nav className={styles.menuContainer}>
          <ul className={styles.menu}>
            <li className={styles.itemMenu}>
              <a className={styles.sign} href='*'>
                Home
              </a>
            </li>
            <li className={styles.itemMenu}>
              <a className={styles.sign} href='*'>
                Course
              </a>
            </li>
            <li className={styles.itemMenu}>
              <a className={styles.sign} href='*'>
                Pages
              </a>
            </li>
            <li className={styles.itemMenu}>
              <a className={styles.sign} href='*'>
                Blog
              </a>
            </li>
            <li className={styles.itemMenu}>
              <a className={styles.sign} href='*'>
                Contact Us
              </a>
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
