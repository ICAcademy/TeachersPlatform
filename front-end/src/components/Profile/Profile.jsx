import React, { useContext } from 'react';
import { Outlet } from 'react-router';

// MUI library
import { Box } from '@mui/material';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Constants
import { TEACHER_ROLE } from 'constants/userRoles';

// Tabs
import ProfileTabs from './ProfileTabs/ProfileTabs';

// Styles
import styles from './Profile.module.scss';

const Profile = () => {
  const {
    currentUser: { role },
  } = useContext(CurrentUserContext);

  return (
    <Box className={styles.container}>
      {role === TEACHER_ROLE ? <ProfileTabs /> : ''}
      <Outlet />
    </Box>
  );
};

export default Profile;
