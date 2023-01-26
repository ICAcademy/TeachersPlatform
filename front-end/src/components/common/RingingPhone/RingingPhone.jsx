import React from 'react';
import PropTypes from 'prop-types';

// Components
import DotsSpinner from '../DotsSpinner/DotsSpinner';
import Timer from 'components/Timer/Timer';

// Constants
import { TEACHER_ROLE, STUDENT_ROLE } from 'constants/userRoles';

// Styles
import styles from './RingingPhone.module.scss';

// Assets
import phoneBtn from 'assets/svg/phone-call.svg';

const RingingPhone = ({
  active,
  role,
  student,
  teacher,
  isCallingUser,
  timer,
  onApprove,
  onDecline,
  onLoading,
  onJoining,
}) => {
  const callApproveHandler = () => {
    onApprove(true);
  };

  const declineCallHandler = () => {
    onDecline(false);
  };

  let callingMessage = '';

  const callingUser = isCallingUser && !onLoading && !onJoining;
  const receiveUser = !isCallingUser && !onLoading && !onJoining;

  if (callingUser && role === TEACHER_ROLE) {
    callingMessage = `Call to ${student.fullName}...`;
  } else if (callingUser && role === STUDENT_ROLE) {
    callingMessage = `Call to ${teacher.fullName}...`;
  } else if (receiveUser && role === TEACHER_ROLE) {
    callingMessage = `${student.fullName} is calling...`;
  } else if (receiveUser && role === STUDENT_ROLE) {
    callingMessage = `${teacher.fullName} is calling...`;
  } else if (onLoading && !onJoining) {
    callingMessage = 'Connecting...Please wait';
  } else if (!onLoading && onJoining) {
    callingMessage = 'Connected';
  } else {
    callingMessage = 'Call...';
  }

  return (
    <div className={styles.ringingPhone}>
      <div className={styles.underCallInfo}>{callingMessage}</div>
      <div className={styles.ringingBox}>
        <div
          className={
            active ? `${styles.callAnimation} ${styles.withoutAnimation}` : styles.callAnimation
          }
        >
          <img src={role === TEACHER_ROLE ? student.url : teacher.url} alt='' width='135' />
        </div>
        <div className={styles.phoneBtns}>
          {active && !isCallingUser && !onLoading && !onJoining && (
            <div className={styles.phoneBtn} onClick={callApproveHandler}>
              <img src={phoneBtn} />
            </div>
          )}
          {onLoading && !onJoining && <DotsSpinner />}
          {onJoining && <Timer running={timer} />}
          <div className={`${styles.phoneBtn} ${styles.declineCall}`} onClick={declineCallHandler}>
            <img src={phoneBtn} />
          </div>
        </div>
      </div>
    </div>
  );
};

RingingPhone.propTypes = {
  onApprove: PropTypes.func,
  onDecline: PropTypes.func,
  active: PropTypes.bool,
  student: PropTypes.object,
  teacher: PropTypes.object,
  role: PropTypes.string,
  isCallingUser: PropTypes.bool,
  onLoading: PropTypes.bool,
  onJoining: PropTypes.bool,
  timer: PropTypes.bool,
};

export default RingingPhone;
