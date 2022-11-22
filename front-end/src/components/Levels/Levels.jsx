/* eslint-disable react/prop-types */
import React from 'react';
import { List, ListItem, Button } from '@mui/material';

const Levels = ({ list, handleUnits }) => {
  return (
    <List sx={{ display: 'flex' }}>
      {list.map((item, i) => (
        <ListItem key={i}>
          <Button onClick={() => handleUnits({ level: item })}>{item}</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Levels;
