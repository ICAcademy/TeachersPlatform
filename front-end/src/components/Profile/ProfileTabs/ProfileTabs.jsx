import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { List } from '@mui/material';

import ProfileTab from '../ProfileTab/ProfileTab';

import { CurrentUserContext } from 'context/AppProvider';

import styles from './ProfileTabs.module.scss';
import { TEACHER_ROLE } from 'constants/userRoles';

let defaultTabs = [
  {
    title: 'General Info',
    link: 'general-info',
  },
];

const ProfileTabs = () => {
  const { state } = useLocation();
  const [selectedTab, setSelectedTab] = useState(state);
  const [tabs, setTabs] = useState(defaultTabs);
  const { currentUser } = useContext(CurrentUserContext);

  const setRouteState = (state) => {
    setSelectedTab(state);
  };

  const selectHandler = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (currentUser.role === TEACHER_ROLE) {
      setTabs((prevState) => {
        return [
          ...prevState,
          {
            title: 'Teacher Info',
            link: 'teacher-info',
          },
        ];
      });
    }
  }, [currentUser.role]);

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
