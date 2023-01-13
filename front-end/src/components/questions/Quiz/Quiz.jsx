import React, { useContext } from 'react';
import { Box, Button, List, ListItem } from '@mui/material';
import PropTypes from 'prop-types';

import { CurrentUserContext } from 'context/AppProvider';

import AnswerPicker from 'components/questions/AnswerPicker/AnswerPicker';

import { TEACHER_ROLE } from 'constants/userRoles';

import styles from './Quiz.module.scss';
import { endLesson } from 'services/lessonService';
import { useNavigate } from 'react-router';

const Quiz = ({ id, questions, isLesson }) => {
  const navigate = useNavigate();

  const {
    currentUser: { role },
  } = useContext(CurrentUserContext);

  const endLessonHandler = async (lessonId) => {
    try {
      await endLesson(lessonId, { lessonStatus: 'ended' });
      navigate('/app/lessons');
    } catch (error) {
      console.log(error);
    }
  };

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
      <Box className={styles.header} sx={{ '& button': { m: 1 } }}>
        <h3 className={styles.title}>Quiz</h3>
        {isLesson && role === TEACHER_ROLE && (
          <Button variant='contained' size='small' onClick={() => endLessonHandler(id)}>
            End lesson
          </Button>
        )}
      </Box>
      <List className={styles.list}>{quiz}</List>
    </>
  );
};

Quiz.propTypes = {
  id: PropTypes.string,
  questions: PropTypes.array,
  isLesson: PropTypes.bool,
};

Quiz.defaultProps = {
  id: '',
  questions: [],
  isLesson: false,
};

export default Quiz;
