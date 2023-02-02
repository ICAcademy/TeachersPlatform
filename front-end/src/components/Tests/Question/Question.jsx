import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button, Checkbox, Input } from '@mui/material';

// Functions
import { isRussianSymbols } from 'hooks/useInput';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from './Question.module.scss';

const Question = ({
  index,
  question,
  addAnswer,
  changeTitleForQuestion,
  changeRightAnswerForQuestion,
  changeAnswerForQuestion,
  deleteAnwerForQuestion,
  postInfo,
  deleteQuestion,
  id,
}) => {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.numberOfQuestion}>
          <div>
            <span className={styles.question}>Question</span>
            {index + 1}
          </div>
          <Button onClick={() => deleteQuestion(id)} sx={{ p: 0, minWidth: 0, fontSize: '17px' }}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
        <div className={styles.titleInputContainer}>
          <Input
            className={styles.input}
            variant='outlined'
            size='small'
            placeholder='Title'
            error={question.title === '' && postInfo}
            value={question.title}
            onChange={(event) => {
              if (!isRussianSymbols(event.target.value)) {
                changeTitleForQuestion(question.id, event);
              }
            }}
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
              <div>
                <Input
                  className={styles.input}
                  placeholder='answer'
                  error={answer.answer === '' && postInfo}
                  value={answer.answer}
                  onChange={(event) => {
                    if (!isRussianSymbols(event.target.value)) {
                      changeAnswerForQuestion(question.id, answer.id, event);
                    }
                  }}
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
        <Button
          className={styles.button}
          sx={{ minHeight: 23, minWidth: 23, padding: 0, borderRadius: 100 }}
          onClick={() => addAnswer(question.id)}
        >
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
  postInfo: PropTypes.bool,
  deleteQuestion: PropTypes.func,
  id: PropTypes.string,
};

export default Question;
