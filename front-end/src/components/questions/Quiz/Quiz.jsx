import React from 'react';
import { List, ListItem } from '@mui/material';
import PropTypes from 'prop-types';

import AnswerPicker from 'components/questions/AnswerPicker/AnswerPicker';

import styles from './Quiz.module.scss';

const Quiz = ({ questions }) => {
  const quiz = questions.map((question) => (
    <ListItem
      divider
      key={question._id}
      sx={{ display: 'flex', justifyContent: 'space-between', py: '15px' }}
    >
      <p>{question.title}</p>
      <AnswerPicker id={question._id} options={question.answers} />
    </ListItem>
  ));

  return (
    <>
      <h3 className={styles.title}>Quiz</h3>
      <List className={styles.list}>{quiz}</List>
    </>
  );
};

Quiz.propTypes = {
  questions: PropTypes.array,
};

Quiz.defaultProps = {
  questions: [],
};

export default Quiz;
