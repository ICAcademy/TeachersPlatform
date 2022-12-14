import React from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';

import ProfileTabs from './ProfileTabs/ProfileTabs';

import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <Box>
      <Box className={styles.container}>
        <ProfileTabs />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Profile;
