import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';
import { pendingSubscriptionsCount } from 'store/pending-subscriptions-slice';

//Components
import ChangeLevel from 'components/ChangeLevel/ChangeLevel';

// Services
import { updateSubscription } from 'services/subscriptionService';
import { updateStudentData } from 'services/studentService';
import { socket } from 'services/socketService';

//Constants
import { noAvatar } from 'constants/photo';
import { TEACHER_ROLE, STUDENT_ROLE } from 'constants/userRoles';
import { APPROVED, PENDING, REJECT } from 'constants/subscriptionStatuses';

// Styles
import styles from './SubscriptionItem.module.scss';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SubscriptionItem = ({ role, subscription, onDelete }) => {
  const [status, setStatus] = useState(subscription.status || PENDING);
  const [level, setLevel] = useState(subscription.studentID.level || '');
  const [isOpen, setIsOpen] = useState(false);

  const dispatchFunction = useDispatch();

  const studentID = subscription.studentID._id;

  const updateStatus = async (status) => {
    try {
      await updateSubscription(subscription._id, { status: status });
    } catch (error) {
      return error;
    }
  };

  const handleStatus = (event) => {
    if (event.target.dataset.status !== status) {
      updateStatus(event.target.dataset.status);
      setStatus(event.target.dataset.status);
    } else {
      updateStatus(PENDING);
      setStatus(PENDING);
    }
  };

  const handleDelete = () => {
    onDelete(subscription._id);
  };

  let statusClass = '';

  if (status === APPROVED) {
    statusClass = styles.approved;
  } else if (status === REJECT) {
    statusClass = styles.reject;
  }

  const handleIsClose = useCallback(() => setIsOpen(false), []);

  const changeLevelHandler = async (value) => {
    try {
      await updateStudentData(studentID, { level: value });
      setLevel(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateStatus(status);
    dispatchFunction(
      pendingSubscriptionsCount({ statusName: PENDING, id: subscription.teacherID }),
    );
  });

  useEffect(() => {
    socket.on('update_subscription', (data) => {
      if (data.id === subscription._id) {
        setStatus(data.body.status);
        dispatchFunction(
          pendingSubscriptionsCount({ statusName: PENDING, id: subscription.teacherID }),
        );
      }
    });
  }, [subscription._id, dispatchFunction, subscription.teacherID]);

  return (
    <div className={styles.subcriptionItem}>
      <div className={styles.itemPart}>
        <div className={`${styles.badgeDot} ${statusClass}`}></div>
        <div className={styles.avatar}>
          <img src={subscription.studentID.url || noAvatar} />
        </div>

        <div className={styles.itemInfo}>
          <div className={styles.userName}>
            {role === STUDENT_ROLE
              ? subscription.teacherID.fullName
              : subscription.studentID.fullName}
            {status && <span className={`${styles.statusValue} ${statusClass}`}>{status}</span>}
          </div>
          {role === TEACHER_ROLE && (
            <div>
              {level ? level : 'No level'}
              <div className={styles.editIcon} onClick={() => setIsOpen(true)}>
                <EditIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.itemPart}>
        <div className={styles.itemInfo}>
          <div className={styles.infoItem}>
            <EmailIcon className={styles.infoIcon} color='primary' />
            {role === STUDENT_ROLE ? subscription.teacherID.email : subscription.studentID.email}
          </div>
          <div className={styles.infoItem}>
            <CakeIcon className={styles.infoIcon} color='primary' />
            {role === STUDENT_ROLE
              ? subscription.teacherID.dateOfBirth
              : subscription.studentID.dateOfBirth}
          </div>
        </div>
      </div>
      <div className={styles.itemPart}>
        {role === STUDENT_ROLE && (
          <Button variant='contained' size='small' onClick={() => onDelete(subscription._id)}>
            Unsubscribe
          </Button>
        )}
        {role === TEACHER_ROLE && (
          <div
            className={`${styles.actionBtn} ${styles.success} ${statusClass}`}
            onClick={handleStatus}
            data-status={APPROVED}
          >
            Approve
          </div>
        )}
        {role === TEACHER_ROLE && (
          <div
            className={`${styles.actionBtn} ${styles.decline} ${statusClass}`}
            onClick={handleStatus}
            data-status={REJECT}
          >
            Decline
          </div>
        )}

        <div>
          <ChangeLevel
            isOpen={isOpen}
            handleIsClose={handleIsClose}
            studentID={studentID}
            level={level}
            changeLevel={changeLevelHandler}
          />
        </div>

        <IconButton aria-label='delete' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

SubscriptionItem.propTypes = {
  subscription: PropTypes.object,
  role: PropTypes.string,
  onDelete: PropTypes.func,
};

export default SubscriptionItem;
