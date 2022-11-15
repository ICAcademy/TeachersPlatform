import React from 'react';
import { Button } from '@mui/material';

// styles
import styles from './Header.module.scss';

// assets
import logo from '../../../assets/images/logo.png';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <Button className={styles.button}><img className={styles.logo} src={logo} alt='logo' /></Button>
                </div>
                <nav className={styles.menuContainer}>
                    <ul className={styles.menu}>
                        <li className={styles.itemMenu}>
                            <a>Home</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a>Course</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a>Pages</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a>Blog</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a>Contact Us</a>
                        </li>
                    </ul>
                </nav>
                <div className={styles.buttonsContainer}>
                    <div className={styles.logInContainer}>
                        <a>Log In</a>
                    </div>
                    <div className={styles.signUpContainer}>
                        <a>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
