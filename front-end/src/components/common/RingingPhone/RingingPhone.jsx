import React from 'react';
import PropTypes from 'prop-types';

//Constants
import { TEACHER_ROLE, STUDENT_ROLE } from 'constants/userRoles';

// Styles
import styles from './RingingPhone.module.scss';

const RingingPhone = ({ active, onApprove, onDecline, student, teacher, role, isCallingUser }) => {
  const callApproveHandler = () => {
    onApprove(true);
  };

  const declineCallHandler = () => {
    onDecline(false);
  };

  let callingMessage = '';

  if (isCallingUser && role === TEACHER_ROLE) {
    callingMessage = `Call to ${student.fullName}...`;
  } else if (isCallingUser && role === STUDENT_ROLE) {
    callingMessage = `Call to ${teacher.fullName}...`;
  } else if (!isCallingUser && role === TEACHER_ROLE) {
    callingMessage = `${student.fullName} is calling...`;
  } else if (!isCallingUser && role === STUDENT_ROLE) {
    callingMessage = `${teacher.fullName} is calling...`;
  } else {
    callingMessage = 'Call...';
  }

  //isCallingUser && TEACHER_ROLE ? 'Call to student...' : ``${student.fullName} is calling...``;

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
          {active && !isCallingUser && (
            <div className={styles.phoneBtn} onClick={callApproveHandler}>
              <svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
              </svg>
            </div>
          )}
          {isCallingUser && (
            <div className={styles.dotsWaiting}>
              <div className={styles.dotElastic}></div>
            </div>
          )}
          <div className={`${styles.phoneBtn} ${styles.declineCall}`} onClick={declineCallHandler}>
            <svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
            </svg>
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
};

export default RingingPhone;
