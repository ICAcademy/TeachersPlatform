import React from 'react';
import PropTypes from 'prop-types';

// components
import { Button, Checkbox, Input } from '@mui/material';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Question.module.scss';

const Question = ({
  index,
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
        <div className={styles.numberOfQuestion}>
          <span className={styles.question}>Question</span>
          {index + 1}
        </div>
        <div className={styles.titleInputContainer}>
          <Input
            className={styles.input}
            variant='outlined'
            label='title'
            size='small'
            value={question.title}
            onChange={(event) => changeTitleForQuestion(question.id, event)}
          />
        </div>
      </div>
      <div className={styles.answersContainer}>
        {question.answers.map((answer) => {
          return (
            <div className={styles.answerContainer} key={answer.id}>
              <div className={styles.checkboxAnswerContainer}>
                <Checkbox
                  size='medium'
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
                  size='small'
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
        <Button className={styles.button} onClick={() => addAnswer(question.id)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </div>
  );
};

Question.propTypes = {
  index: PropTypes.number,
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
