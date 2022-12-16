import React from 'react';
import PropTypes from 'prop-types';

// components
import { Button } from '@mui/material';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// styles
import styles from './Mobile.module.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Mobile = ({ handleShowMenu }) => {
  return (
    <div className={styles.menuContainer}>
      <Button onClick={handleShowMenu}>
        <FontAwesomeIcon className={styles.menu} icon={faBars} />
      </Button>
    </div>
  );
};

Mobile.propTypes = {
  handleShowMenu: PropTypes.func,
};

export default Mobile;
