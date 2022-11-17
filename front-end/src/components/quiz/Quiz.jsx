import React, { useEffect, useState } from 'react';
import { List, ListItem, ListSubheader, Typography } from '@mui/material';

import AnswerPicker from 'components/answerPicker/AnswerPicker';

import { getAllQuestions } from 'services/questions';

const Quiz = () => {
  const [questionList, setQuestionList] = useState([]);

  const fetchQuestions = async () => {
    const { questions } = await getAllQuestions();
    setQuestionList(questions);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const quiz = questionList[0]?.body.map((question, i) => (
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
