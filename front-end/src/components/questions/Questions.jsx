/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';

import { getAllQuestions } from 'services/questions';

const Questions = () => {
  const [data, setData] = useState([]);

  const [levels, setLevels] = useState([]);

  const fetchData = async (criterias) => {
    const { questions } = await getAllQuestions(criterias);
    setData(questions);
  };

  const fetchLevels = async () => {
    const { questions } = await getAllQuestions('fields=level');
    setLevels(questions);
  };

  console.log(data);

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Questions</Typography>
      <List sx={{ display: 'flex' }}>
        {levels.map((level, i) => (
          <ListItem key={i}>
            <Button onClick={() => fetchData(`level=${level}&fields=level,unit`)}>{level}</Button>
          </ListItem>
        ))}
      </List>
      <List sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {data.map((item) => (
          <ListItem key={item._id}>
            <Box sx={{ p: '25px', border: '1px solid black', borderRadius: '20px' }}>
              <Typography variant='body1'>{item.unit}</Typography>
              <Typography variant='body2'>Description</Typography>
              <Button>Go to</Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Questions;
