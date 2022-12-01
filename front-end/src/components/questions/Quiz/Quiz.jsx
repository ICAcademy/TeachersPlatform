import React from 'react';
import { List, ListItem, ListSubheader, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import AnswerPicker from '../AnswerPicker/AnswerPicker';

const Quiz = ({ questions }) => {
  const quiz = questions.map((question, i) => (
    <ListItem
      divider
      key={question._id}
      sx={{ display: 'flex', justifyContent: 'space-between', py: '15px' }}
    >
      <Typography variant='body1'>{`${i + 1}. ${question.title}`}</Typography>
      <AnswerPicker id={question._id} options={question.answers} />
    </ListItem>
  ));

  return (
    <div>
      <List subheader={<ListSubheader sx={{ fontSize: '32px' }}>Questions</ListSubheader>}>
        {quiz}
      </List>
    </div>
  );
};

Quiz.propTypes = {
  questions: PropTypes.array,
};

export default Quiz;
