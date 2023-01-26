import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Typography } from '@mui/material';

import styles from './NoSubscriptions.module.scss';

const NoSubscriptions = () => {
  const navigate = useNavigate();

  const clickHandler = () => navigate('teachers');

  return (
    <Box className={styles.wrapper}>
      <Typography variant='h6' color='primary' className={styles.description}>
        Start learning from the best teachers from the whole world
      </Typography>
      <Button variant='contained' onClick={clickHandler}>
        Join now
      </Button>
    </Box>
  );
};

export default NoSubscriptions;
