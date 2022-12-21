import React from 'react';
import { useLocation } from 'react-router-dom';

//Styles
import styles from './Loader.module.scss';

const Loader = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={`${styles.loader} ${
        pathname === '/login' || pathname === '/registration' ? styles.white : styles.purple
      }`}
    />
  );
};

export default Loader;
