import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './BurgerButton.module.scss';
import MenuIcon from '@mui/icons-material/Menu';

const BurgerButton = ({ onClick }) => {
  const clickHandler = () => {
    onClick();
  };

  return (
    <div className={styles.burgerButton} onClick={clickHandler}>
      <MenuIcon className={styles.burgerLines} />
    </div>
  );
};

//propTypes
BurgerButton.propTypes = {
  onClick: PropTypes.func,
};

export default BurgerButton;
