/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { List, ListSubheader, ListItem, Button } from '@mui/material';

import { getTopicsByUnit } from 'services/questions';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const { unit } = useParams();

  const fetchTopics = async (unit) => {
    try {
      const data = await getTopicsByUnit({ unit });
      setTopics(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchTopics(unit);
  }, [unit]);

  return (
    <List>
      <ListSubheader>{unit}</ListSubheader>
      {topics.map((item) => (
        <ListItem key={item._id}>
          <Link to={`/questions/topic/quiz/${item.topic}`}>{item.topic}</Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Topics;
