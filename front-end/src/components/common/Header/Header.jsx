/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './Header.module.scss';

// assets
import logo from 'assets/images/logo.png';
import Desktop from './Desktop/Desktop';
import Mobile from './Mobile/Mobile';
import MobileMenu from './MobileMenu/MobileMenu';

const Header = () => {
  const [showBurger, setShowBurger] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.matchMedia('(max-width: 864px)').matches) {
        setShowBurger(true);
      } else {
        setShowBurger(false);
      }
    });
  }, []);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  console.log('showBurger', showBurger);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Link to='/'>
            <img className={styles.logo} src={logo} alt='logo' />
          </Link>
        </div>
        {showBurger ? <Mobile handleShowMenu={handleShowMenu} /> : <Desktop />}
        {showMenu && <MobileMenu handleShowMenu={handleShowMenu} />}
      </div>
    </div>
  );
};

export default Header;
