import React from 'react';
import { Link } from 'react-router-dom';
import { Box, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

import styles from './LessonItem.module.scss';

import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PersonIcon from '@mui/icons-material/Person';

const LessonItem = ({ id, topic, participant, status }) => {
  return (
    <Link to={`${id}`} className={styles.lesson}>
      <Box className={styles.lesson__info}>
        <Box className={styles.lesson__info__item}>
          <ListItemIcon sx={{ minWidth: 'auto', mr: '10px', transform: 'translateY(-5%)' }}>
            <LabelImportantIcon />
          </ListItemIcon>
          <ListItemText primary={topic} />
        </Box>
        <Box className={styles.lesson__info__item}>
          <ListItemIcon sx={{ minWidth: 'auto', mr: '10px', transform: 'translateY(-5%)' }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={participant} />
        </Box>
      </Box>
      <Box className={styles.lesson__status}>
        <Box className={styles.lesson__statusDot}></Box>
        <Box className={styles.lesson__statusText}>{status}</Box>
      </Box>
    </Link>
  );
};

LessonItem.propTypes = {
  id: PropTypes.string,
  topic: PropTypes.string,
  participant: PropTypes.string,
  status: PropTypes.string,
};

export default LessonItem;
