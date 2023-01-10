import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000/');

// Redux
import { useDispatch } from 'react-redux';
import { pendingSubscriptionsCount } from 'store/pending-subscriptions-slice';

// Services
import { updateSubscription } from 'services/subscriptionService';

// Styles
import styles from './SubscriptionItem.module.scss';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const SubscriptionItem = ({ role, subscription, onDelete }) => {
  const [status, setStatus] = useState(subscription.status || 'pending');

  const dispatchFunction = useDispatch();

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
      updateStatus('pending');
      setStatus('pending');
    }
  };

  const handleDelete = () => {
    onDelete(subscription._id);
  };

  let statusClass = '';

  if (status === 'approved') {
    statusClass = styles.approved;
  } else if (status === 'reject') {
    statusClass = styles.reject;
  }

  const noAvatarUrl =
    'https://storage.googleapis.com/teachers-platform-40cbe.appspot.com/b7dfa353b6ffb1db78bd1059a3448560.jpg';

  useEffect(() => {
    updateStatus(status);
    dispatchFunction(
      pendingSubscriptionsCount({ statusName: 'pending', id: subscription.teacherID }),
    );
  });

  useEffect(() => {
    socket.on('update', (data) => {
      if (data.id === subscription._id) {
        setStatus(data.body.status);
        dispatchFunction(
          pendingSubscriptionsCount({ statusName: 'pending', id: subscription.teacherID }),
        );
      }
    });
  }, [subscription._id, dispatchFunction, subscription.teacherID]);

  return (
    <div className={styles.subcriptionItem}>
      <div className={styles.itemPart}>
        <div className={`${styles.badgeDot} ${statusClass}`}></div>
        <div className={styles.avatar}>
          <img src={subscription.studentID.url || noAvatarUrl} />
        </div>

        <div className={styles.itemInfo}>
          <p className={styles.userName}>
            {role === 'student' ? subscription.teacherID.fullName : subscription.studentID.fullName}
            {status && <span className={`${styles.statusValue} ${statusClass}`}>{status}</span>}
          </p>
          <p>
            {role === 'student'
              ? subscription.teacherID.level || 'No level'
              : subscription.studentID.level || 'No level'}
          </p>
        </div>
      </div>
      <div className={styles.itemPart}>
        <div className={styles.itemInfo}>
          <div className={styles.infoItem}>
            <EmailIcon className={styles.infoIcon} color='primary' />
            {role === 'student' ? subscription.teacherID.email : subscription.studentID.email}
          </div>
          <div className={styles.infoItem}>
            <CakeIcon className={styles.infoIcon} color='primary' />
            {role === 'student'
              ? subscription.teacherID.dateOfBirth
              : subscription.studentID.dateOfBirth}
          </div>
        </div>
      </div>
      <div className={styles.itemPart}>
        {role === 'student' && (
          <Button variant='contained' size='small' onClick={() => onDelete(subscription._id)}>
            Unsubscribe
          </Button>
        )}
        {role === 'teacher' && (
          <div
            className={`${styles.actionBtn} ${styles.success} ${statusClass}`}
            onClick={handleStatus}
            data-status='approved'
          >
            Approve
          </div>
        )}
        {role === 'teacher' && (
          <div
            className={`${styles.actionBtn} ${styles.decline} ${statusClass}`}
            onClick={handleStatus}
            data-status='reject'
          >
            Decline
          </div>
        )}

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
