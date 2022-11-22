/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { List, ListItem, ListSubheader, Typography } from '@mui/material';

import AnswerPicker from 'components/AnswerPicker/AnswerPicker';

import { getQuizByTopic } from 'services/questions';

const Quiz = () => {
  const [questionList, setQuestionList] = useState([]);
  const { topic } = useParams();

  const fetchQuestions = async (topic) => {
    const [data] = await getQuizByTopic({ topic });
    setQuestionList(data.questions);
  };

  useEffect(() => {
    fetchQuestions(topic);
  }, [topic]);

  const quiz = questionList.map((question, i) => (
    <ListItem
      divider='true'
      key={question._id}
      sx={{ display: 'flex', justifyContent: 'space-between', py: '15px' }}
    >
      <Typography variant='body1'>{`${i + 1}. ${question.title}`}</Typography>
      <AnswerPicker id={question._id} options={question.answers} />
    </ListItem>
  ));

  return (
    <List subheader={<ListSubheader sx={{ fontSize: '32px' }}>Questions</ListSubheader>}>
      {quiz}
    </List>
  );
};

export default Quiz;
