import React from 'react';
import { ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './ProfileTab.module.scss';

const sx = {
  tab: {
    color: '#7f839a',
    borderBottom: '3px solid transparent',
    '&:hover': {
      color: 'primary.main',
      backgroundColor: 'transparent',
      borderBottom: '3px solid #b464a6',
    },
    '&.MuiListItem-root.Mui-selected': {
      color: 'primary.main',
      backgroundColor: 'transparent',
      borderBottom: '3px solid #b464a6',
    },
  },
};

const ProfileTab = ({ title, link, selected, selectTab }) => {
  return (
    <Link to={link} className={styles.link} state={link}>
      <ListItem selected={selected === link} onClick={() => selectTab(link)} sx={sx.tab}>
        {title}
      </ListItem>
    </Link>
  );
};

ProfileTab.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  selected: PropTypes.string,
  selectTab: PropTypes.func,
};

export default ProfileTab;
