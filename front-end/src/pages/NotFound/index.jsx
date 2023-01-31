import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI library
import { Button } from '@mui/material';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Constants
import { ADMIN_ROLE } from 'constants/userRoles';

// Assets
import notFound from 'assets/svg/notFound.svg';

// Styles
import styles from './NotFound.module.scss';

const NotFound = () => {
  const { currentUser: role } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleRedirect = (userRole) => {
    if (userRole === ADMIN_ROLE) return navigate('/app/calendar');
    return navigate('/app');
  };

  return (
    <div className={styles.wrapper}>
      <img src={notFound} alt='404 not found' />
      <div className={styles.block}>
        <h1>
          <i>
            We&apos;re sorry, the page you requested could not be found. Please go back to the home
            page.
          </i>
        </h1>
        <Button variant='contained' size='small' onClick={() => handleRedirect(role)}>
          home page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
