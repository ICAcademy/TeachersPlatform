import { Button } from '@mui/material';
import React from 'react';

// styles
import styles from './Header.module.scss';

// assets
import logo from '../../assets/images/logo.png';

const Header = () => {
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <Button><img src={logo} alt='logo' /></Button>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a>Home</a>
                        </li>
                        <li>
                            <a>Course</a>
                        </li>
                        <li>
                            <a>Pages</a>
                        </li>
                        <li>
                            <a>Blog</a>
                        </li>
                        <li>
                            <a>Contact Us</a>
                        </li>
                    </ul>
                    <div>
                        <div>
                            <Button>Log In</Button>
                        </div>
                        <div>
                            <Button>Sign Up</Button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
