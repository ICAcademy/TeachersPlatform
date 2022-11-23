import React from 'react';
import PropTypes from 'prop-types';

import styles from './Question.module.scss';
import { Button, Checkbox, Input } from '@mui/material';

const Question = ({
  question,
  addAnswer,
  changeTitleForQuestion,
  changeRightAnswerForQuestion,
  changeAnswerForQuestion,
  deleteAnwerForQuestion,
}) => {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.titleContainer}>
        <Input
          value={question.title}
          onChange={(event) => changeTitleForQuestion(question.id, event)}
        />
      </div>
      <div className={styles.answersContainer}>
        {question.answers.map((answer) => {
          return (
            <div className={styles.answerContainer} key={answer.id}>
              <div className={styles.checkboxAnswerContainer}>
                <Checkbox
                  checked={answer.right}
                  onChange={() => changeRightAnswerForQuestion(question.id, answer.id)}
                />
              </div>
              <div className={styles.inputAnswerContainer}>
                <Input
                  value={answer.answer}
                  onChange={(event) => changeAnswerForQuestion(question.id, answer.id, event)}
                />
              </div>
              <div className={styles.buttonDeleteAnswerContainer}>
                <Button onClick={() => deleteAnwerForQuestion(question.id, answer.id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button onClick={() => addAnswer(question.id)}>Add answer</Button>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object),
  }),
  addAnswer: PropTypes.func,
  changeAnswerForQuestion: PropTypes.func,
  changeRightAnswerForQuestion: PropTypes.func,
  changeTitleForQuestion: PropTypes.func,
  deleteAnwerForQuestion: PropTypes.func,
};

export default Question;
