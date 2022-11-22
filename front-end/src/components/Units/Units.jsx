/* eslint-disable react/prop-types */
import React from 'react';
import { List, ListItem, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Units = ({ list }) => {
  return (
    <List sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {list.map((item) => (
        <ListItem key={item._id}>
          <Box sx={{ p: '25px', border: '1px solid black', borderRadius: '20px' }}>
            <Typography variant='body1'>{item.unit}</Typography>
            <Typography variant='body2'>Description</Typography>
            <Link to={`topic/${item.unit}`}>Go to</Link>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default Units;
