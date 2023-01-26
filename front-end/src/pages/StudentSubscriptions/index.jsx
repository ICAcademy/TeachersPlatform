import React, { useState, useContext, useEffect } from 'react';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Services
import { deleteSubscription, getStudentSubscription } from 'services/subscriptionService';
import { socket } from 'services/socketService';

// Components
import SubscriptionsTable from 'components/common/SubscriptionsTable';
import Loader from 'components/common/Loader/Loader';
import NoSubscriptions from 'components/common/NoSubscriptions';

// Styles
import styles from './StudentSubscriptions.module.scss';

const StudentSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const fetchSubscriptions = async (id) => {
    try {
      setIsLoading(true);
      const subscriptions = await getStudentSubscription(id);
      setSubscriptions(subscriptions);
      setIsLoading(false);
    } catch (e) {
      return e;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubscriptionById = async (id) => {
    try {
      setIsLoading(true);
      const necessarySubscription = subscriptions.find((subscription) => {
        return subscription._id === id;
      });
      const deletedSubscription = await deleteSubscription(necessarySubscription._id);
      await fetchSubscriptions(currentUser.roleId._id);
      setIsLoading(false);
      return deletedSubscription;
    } catch (e) {
      return e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(currentUser?.roleId._id);
  }, [currentUser]);

  useEffect(() => {
    socket.on('delete_subscription', (data) => {
      const deletedSubscription = subscriptions.find((subscription) => {
        return subscription._id === data;
      });
      if (deletedSubscription) {
        fetchSubscriptions(currentUser.roleId._id);
      }
    });
  }, [currentUser.roleId._id, subscriptions]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : subscriptions.length ? (
        <SubscriptionsTable
          subscriptions={subscriptions}
          role={currentUser?.role}
          deleteSubscriptionById={deleteSubscriptionById}
        />
      ) : (
        <NoSubscriptions subscribeTo='teacher' />
      )}
    </div>
  );
};

export default StudentSubscriptions;
