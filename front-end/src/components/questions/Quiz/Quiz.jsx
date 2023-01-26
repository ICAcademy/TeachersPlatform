import React, { useState, useContext, useEffect } from 'react';
import useSound from 'use-sound';
import PropTypes from 'prop-types';

import { CurrentUserContext } from 'context/AppProvider';

//HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// Services
import { socket } from 'services/socketService';

// Constants
import { STUDENT_ROLE, TEACHER_ROLE } from 'constants/userRoles';

//Components
import AnswerPicker from 'components/questions/AnswerPicker/AnswerPicker';
import MeetRoom from 'components/MeetRoom/MeetRoom';
import RingingPhone from 'components/common/RingingPhone/RingingPhone';

// Styles
import styles from './Quiz.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Box, Button, List, ListItem } from '@mui/material';

// Sounds
import ringtone from 'assets/sounds/facebook-messenger-tone.mp3';

const Quiz = ({ id, questions, isLesson, student, teacher, snackbarShowMessage }) => {
  // States for calls
  const [callRequest, setCallRequest] = useState(false);
  const [callApprove, setCallApprove] = useState(false);
  const [isCallingUser, setIsCallingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [runningTimer, setRunningTimer] = useState(false);

  const [playBoop, { stop }] = useSound(ringtone);

  const {
    currentUser: { role, _id },
  } = useContext(CurrentUserContext);

  const resetCallState = (state) => {
    setCallRequest(state);
    setCallApprove(state);
    setIsUserJoined(state);
    setIsCallingUser(state);
  };

  const endLessonHandler = () => {
    socket.emit('lesson:end', id);
  };

  const callToUserHandler = () => {
    playBoop();
    socket.emit('lesson:call-request', { roomId: id, userId: _id });
  };

  const callApproveHandler = (state) => {
    stop();
    setIsLoading(true);
    setCallApprove(state);
    socket.emit('lesson:call-approve', { roomId: id, approved: true });
  };

  const declineCallHandler = (state) => {
    stop();
    resetCallState(state);
    socket.emit('lesson:call-approve', { roomId: id, approved: false });
  };

  const joinUserHandler = (state) => {
    setIsUserJoined(state);
    setIsLoading(false);
    setRunningTimer(true);
  };

  useEffect(() => {
    socket.on('lesson:call-request', (data) => {
      if (data.userId === _id) {
        setIsCallingUser(true);
      } else {
        setIsCallingUser(false);
      }
      setCallRequest(true);
      playBoop();
    });

    socket.on('lesson:call-approve', (data) => {
      setCallApprove(data.approved);
      setCallRequest(data.approved);
      if (!data.approved) {
        snackbarShowMessage({
          message: 'Call was cancelled',
          severity: 'error',
        });
        setIsUserJoined(false);
      }
      stop();
    });

    if (isUserJoined) {
      socket.on('lesson:updated', (data) => {
        const dataValues = Object.values(data);
        const offlineStatus = dataValues.find((value) => value === 'offline');
        if (offlineStatus) {
          resetCallState(false);
          snackbarShowMessage({
            message: 'Another user left the lesson',
            severity: 'error',
          });
        }
      });
    }
  });

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
        <Button variant='contained' size='small' onClick={callToUserHandler} disabled={callRequest}>
          {`Call to ${role === TEACHER_ROLE ? STUDENT_ROLE : TEACHER_ROLE}`}
        </Button>
        {isLesson && role === TEACHER_ROLE && (
          <Button variant='contained' size='small' onClick={endLessonHandler}>
            End lesson
          </Button>
        )}
      </Box>
      <List className={styles.list}>{quiz}</List>
      {callRequest && (
        <RingingPhone
          active={callRequest}
          onApprove={callApproveHandler}
          onDecline={declineCallHandler}
          onJoining={isUserJoined}
          onLoading={isLoading}
          isCallingUser={isCallingUser}
          student={student}
          teacher={teacher}
          role={role}
          timer={runningTimer}
        />
      )}
      {callApprove && <MeetRoom roomId={id} onJoin={joinUserHandler} />}
    </>
  );
};

Quiz.propTypes = {
  id: PropTypes.string,
  questions: PropTypes.array,
  isLesson: PropTypes.bool,
  student: PropTypes.object,
  teacher: PropTypes.object,
  snackbarShowMessage: PropTypes.func,
};

Quiz.defaultProps = {
  id: '',
  questions: [],
  isLesson: false,
};

export default withSnackbar(Quiz);
