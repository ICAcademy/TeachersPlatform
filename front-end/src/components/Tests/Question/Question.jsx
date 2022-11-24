import React from 'react';
import PropTypes from 'prop-types';

// components
import { Button, Checkbox, Input } from '@mui/material';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// styles
import styles from './Question.module.scss';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
          className={styles.input}
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
                  size='large'
                  className={styles.checkbox}
                  checked={answer.right}
                  onChange={() => changeRightAnswerForQuestion(question.id, answer.id)}
                />
              </div>
              <div className={styles.inputAnswerContainer}>
                <Input
                  className={styles.input}
                  value={answer.answer}
                  onChange={(event) => changeAnswerForQuestion(question.id, answer.id, event)}
                />
              </div>
              <div className={styles.buttonDeleteAnswerContainer}>
                <Button
                  className={styles.button}
                  variant='contained'
                  onClick={() => deleteAnwerForQuestion(question.id, answer.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.addAnswerContainer}>
        <Button variant='contained' onClick={() => addAnswer(question.id)}>
          Add answer
        </Button>
      </div>
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
