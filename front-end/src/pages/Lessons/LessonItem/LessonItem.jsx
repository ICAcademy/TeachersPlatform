import React from 'react';
import { Link } from 'react-router-dom';
import { Box, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

import styles from './LessonItem.module.scss';

import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PersonIcon from '@mui/icons-material/Person';

const LessonItem = ({ id, topic, student, status }) => {
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
          <ListItemText primary={student} />
        </Box>
      </Box>
      <Box
        className={
          status === 'processing'
            ? `${styles.lesson__status} ${styles['lesson__status--processing']}`
            : `${styles.lesson__status} ${styles['lesson__status--ended']}`
        }
      >
        {status}
      </Box>
    </Link>
  );
};

LessonItem.propTypes = {
  id: PropTypes.string,
  topic: PropTypes.string,
  student: PropTypes.string,
  status: PropTypes.string,
};

export default LessonItem;
