/* eslint-disable react/prop-types */
import React from 'react';
import { List, ListItem, Button } from '@mui/material';

import styles from './Levels.module.scss';

const Levels = ({ list, handleUnits }) => {
  return (
    <List className={styles.list}>
      {list.map((item, i) => (
        <ListItem key={i} className={styles.list__item}>
          <Button className={styles.list__itemBtn} onClick={() => handleUnits({ level: item })}>
            {item}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Levels;
