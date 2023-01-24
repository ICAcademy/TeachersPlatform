import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, List, ListItem } from '@mui/material';
import PropTypes from 'prop-types';

import { CurrentUserContext } from 'context/AppProvider';

import AnswerPicker from 'components/questions/AnswerPicker/AnswerPicker';
import MeetRoom from 'components/MeetRoom/MeetRoom';

import { socket } from 'services/socketService';

import { TEACHER_ROLE } from 'constants/userRoles';

import styles from './Quiz.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import RingingPhone from 'components/common/RingingPhone/RingingPhone';

const Quiz = ({ id, questions, isLesson, student }) => {
  const [callRequest, setCallRequest] = useState(false);
  const [callApprove, setCallApprove] = useState(false);
  const [joinCall, setJoinCall] = useState(false);
  const [callingUser, setCallingUser] = useState('');

  const {
    currentUser: { role, _id },
  } = useContext(CurrentUserContext);

  const endLessonHandler = () => {
    socket.emit('lesson:end', id);
  };

  const callToUserHandler = () => {
    socket.emit('lesson:call-request', { roomId: id, userId: _id });
  };

  const callApproveHandler = (state) => {
    setCallApprove(state);
    socket.emit('lesson:call-approve', { roomId: id, approved: true });
  };

  useEffect(() => {
    socket.on('lesson:call-request', (data) => {
      if (data.userId !== _id) {
        setCallRequest(true);
      }
      setCallingUser(data.userId);
    });

    socket.on('lesson:call-approve', (data) => {
      setCallApprove(data.approved);
      setJoinCall(true);
    });
  });

  console.log(callingUser);

  const quiz = questions.map((question) => (
    <ListItem
      divider
      key={question._id}
      sx={{ display: 'flex', justifyContent: 'space-between', py: '15px' }}
    >
      <p>{question.title}</p>

      {role === TEACHER_ROLE && question.selected && (
        <Box className={styles.answerStatus}>
          {question.correct === question.selected ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={`${styles.answerIcon} ${styles['answerIcon--correct']}`}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={`${styles.answerIcon} ${styles['answerIcon--incorrect']}`}
            />
          )}
        </Box>
      )}

      <AnswerPicker
        id={question._id}
        roomId={id}
        options={question.answers}
        selected={isLesson ? question.selected : ''}
        isLesson={isLesson}
      />
    </ListItem>
  ));

  return (
    <>
      <Box className={styles.header} sx={{ '& button': { m: 1 } }}>
        <h3 className={styles.title}>Quiz</h3>
        <Button variant='contained' size='small' onClick={callToUserHandler}>
          Call to teacher
        </Button>
        {isLesson && role === TEACHER_ROLE && (
          <Button variant='contained' size='small' onClick={endLessonHandler}>
            End lesson
          </Button>
        )}
      </Box>
      <List className={styles.list}>{quiz}</List>
      {callRequest && (
        <RingingPhone active={joinCall} onApprove={callApproveHandler} student={student} />
      )}
      {callApprove && <MeetRoom roomId={id} />}
    </>
  );
};

Quiz.propTypes = {
  id: PropTypes.string,
  questions: PropTypes.array,
  isLesson: PropTypes.bool,
  student: PropTypes.object,
};

Quiz.defaultProps = {
  id: '',
  questions: [],
  isLesson: false,
};

export default Quiz;
