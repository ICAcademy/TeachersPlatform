import React, { useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000/');

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Services
import { deleteSubscription, getStudentSubscription } from 'services/subscriptionService';

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
      await fetchSubscriptions(currentUser.roleId);
      setIsLoading(false);
      return deletedSubscription;
    } catch (e) {
      return e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(currentUser?.roleId);
  }, [currentUser]);

  useEffect(() => {
    socket.on('delete', (data) => {
      const deletedSubscription = subscriptions.find((subscription) => {
        return subscription._id === data;
      });
      console.log(deletedSubscription);
      if (deletedSubscription) {
        fetchSubscriptions(currentUser.roleId);
      }
    });
  }, [currentUser.roleId, subscriptions]);

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
