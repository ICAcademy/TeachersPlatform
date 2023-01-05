import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import styles from './Tabs.module.scss';

const Tabs = ({ list }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.wrapper}>
      {list.map(({ title, link }) => (
        <NavLink
          className={`${styles.link} ${link === pathname ? styles.active : ''}`}
          key={title}
          to={link}
        >
          {title}
        </NavLink>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default Tabs;
