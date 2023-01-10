import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// Service
import { getTeachersSubscription, deleteSubscription } from 'services/subscriptionService';
import { socket } from 'services/socketService';

// Components
import SubscriptionsTable from 'components/common/SubscriptionsTable';
import Loader from 'components/common/Loader/Loader';
import NoSubscriptions from 'components/common/NoSubscriptions';

// Styles
import styles from './TeacherSubscriptions.module.scss';

const TeacherSubscriptions = ({ snackbarShowMessage }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubscriptions = async (teacherId) => {
    try {
      setIsLoading(true);
      const data = await getTeachersSubscription(teacherId);
      setSubscriptions(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteSubscriptionById = async (id) => {
    try {
      setIsLoading(true);
      const necessarySubscription = subscriptions.find((subscription) => {
        return subscription._id === id;
      });
      const remove = await deleteSubscription(necessarySubscription._id);
      await fetchSubscriptions(currentUser.roleId);
      setIsLoading(false);
      snackbarShowMessage({
        message: 'Subscription removed',
        severity: 'success',
      });
      return remove;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(currentUser?.roleId);
  }, [currentUser]);

  useEffect(() => {
    socket.on('create_subscription', (data) => {
      if (data.teacher._id === currentUser.roleId) {
        fetchSubscriptions(currentUser?.roleId);
      }
    });
  }, [currentUser?.roleId]);

  useEffect(() => {
    socket.on('delete_subscription', (data) => {
      const deletedSubscription = subscriptions.find((subscription) => {
        return subscription._id === data;
      });
      if (deletedSubscription) {
        fetchSubscriptions(currentUser.roleId);
      }
    });
  }, [currentUser.roleId, subscriptions]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : subscriptions.length ? (
        <SubscriptionsTable
          subscriptions={subscriptions}
          role={currentUser?.role}
          deleteSubscriptionById={deleteSubscriptionById}
        />
      ) : (
        <NoSubscriptions subscribeTo='student' />
      )}
    </div>
  );
};

TeacherSubscriptions.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(TeacherSubscriptions);
