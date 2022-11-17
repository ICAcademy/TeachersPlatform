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
                            <a className={styles.sign} href="*">Home</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a className={styles.sign} href="*">Course</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a className={styles.sign} href="*">Pages</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a className={styles.sign} href="*">Blog</a>
                        </li>
                        <li className={styles.itemMenu}>
                            <a className={styles.sign} href="*">Contact Us</a>
                        </li>
                    </ul>
                </nav>
                <div className={styles.buttonsContainer}>
                    <div className={styles.logInContainer}>
                        <a className={styles.logIn} href="*">Log In</a>
                    </div>
                    <div className={styles.signUpContainer}>
                        <a className={styles.signUp}>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
