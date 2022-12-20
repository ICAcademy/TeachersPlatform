import React from 'react';
import { useLocation } from 'react-router-dom';

//Styles
import styles from './Loader.module.scss';

const Loader = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={`${pathname === '/login' || pathname === '/registration' ? 'white' : 'purple'}`}
    ></div>
  );
};

export default Loader;
