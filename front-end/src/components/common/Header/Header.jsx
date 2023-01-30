/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './Header.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Components
import BurgerButton from '../BurgerButton/BurgerButton';

// assets
import logo from 'assets/images/logo.png';

const Header = () => {
  const [showSidebar, setShowSideBar] = useState(false);
  const sidebarHandler = () => {
    setShowSideBar(!showSidebar);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <BurgerButton onClick={sidebarHandler} />
        <div className={styles.logoContainer}>
          <Link to='/'>
            <img className={styles.logo} src={logo} alt='logo' />
          </Link>
        </div>
        <nav className={`${styles.menuContainer} ${showSidebar ? styles.open : ''}`}>
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
          <Link className={styles.mobProfile} to='/login'>
            <AccountCircleIcon color='primary'></AccountCircleIcon>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
