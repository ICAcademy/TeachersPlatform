import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { List } from '@mui/material';

import ProfileTab from '../ProfileTab/ProfileTab';

import styles from './ProfileTabs.module.scss';

const tabs = [
  {
    title: 'General Info',
    link: 'general-info',
  },
  {
    title: 'Contact Info',
    link: 'contact-info',
  },
  {
    title: 'Subjects',
    link: 'subjects',
  },
  {
    title: 'Languages',
    link: 'languages',
  },
];

const ProfileTabs = () => {
  const { state } = useLocation();
  const [selectedTab, setSelectedTab] = useState(state);

  const setRouteState = (state) => {
    setSelectedTab(state);
  };

  const selectHandler = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    setRouteState(state);
  }, [state]);

  return (
    <List className={styles.tabs} disablePadding sx={{ mb: '50px' }}>
      {tabs.map((tab, i) => (
        <ProfileTab
          key={i}
          title={tab.title}
          link={tab.link}
          selected={selectedTab}
          selectTab={selectHandler}
        />
      ))}
    </List>
  );
};

export default ProfileTabs;
