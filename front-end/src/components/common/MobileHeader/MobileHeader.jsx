import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Assets
import logo from 'assets/sidebar/logo-letter.png';
import avatar from 'assets/sidebar/avatar.png';

// Styles
import styles from './MobileHeader.module.scss';

// Components
import BurgerButton from '../BurgerButton/BurgerButton';

const MobileHeader = ({ showSidebar, sidebarState }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const handleClick = () => {
    showSidebar(!sidebarState);
  };

  const userNameArr = currentUser.fullName.split(' ');
  const cuttedUserName = `${userNameArr[0]} ${userNameArr[1][0]}.`;

  return (
    <div className={styles.mobileHeader}>
      <BurgerButton onClick={handleClick} />
      <div className={styles.sidebarImgHolder}>
        <div className={styles.sidebarImgBlock}>
          <Link to='/'>
            <img src={logo} alt='logo' width='30px' />
          </Link>
          <Link to='/'>
            <span className={styles.sidebarLogoText}>Inter School</span>
          </Link>
        </div>
      </div>
      <div className={styles.sidebarImgAvatar}>
        <Link to='profile/general-info' state={'general-info'} className={styles.sidebarAvatarLink}>
          <img src={currentUser.url || avatar} alt='logo' className={styles.sidebarAvatar} />
        </Link>
        <Typography className={styles.userInfo} variant='h6' align='center'>
          {cuttedUserName}
          <span className={styles.userRole}>{currentUser.role}</span>
        </Typography>
      </div>
    </div>
  );
};

//propTypes
MobileHeader.propTypes = {
  showSidebar: PropTypes.func,
  sidebarState: PropTypes.bool,
};

export default MobileHeader;
