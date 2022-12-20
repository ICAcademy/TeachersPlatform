import React from 'react';
import { useLocation } from 'react-router-dom';

//Styles
import styles from './Loader.module.scss';

const Loader = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === '/login' || pathname === '/registration' ? (
        <div className={styles.loaderWhite}></div>
      ) : (
        <div className={styles.loaderPurple}></div>
      )}
    </>
  );
};

export default Loader;
