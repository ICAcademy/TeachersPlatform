import React, { useState } from 'react';
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
  const [selectedTab, setSelectedTab] = useState('General Info');

  const selectHandler = (tab) => {
    setSelectedTab(tab);
  };

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
