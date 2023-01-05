import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { List } from '@mui/material';

import ProfileTab from '../ProfileTab/ProfileTab';

import { CurrentUserContext } from 'context/AppProvider';

import styles from './ProfileTabs.module.scss';

const defaultTabs = [
  {
    title: 'General Info',
    link: 'general-info',
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
  const [tabs, setTabs] = useState(defaultTabs);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.role === 'teacher') {
      setTabs([
        ...tabs,
        {
          title: 'Teacher Info',
          link: 'teacher-info',
        },
      ]);
    }
  }, []);

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
