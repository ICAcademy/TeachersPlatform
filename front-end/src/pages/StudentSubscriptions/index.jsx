import React, { useState, useContext, useEffect, useCallback } from 'react';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Services
import { deleteSubscription, getSubscriptionByQueries } from 'services/subscriptionService';
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
  const {
    currentUser: { role, roleId },
  } = useContext(CurrentUserContext);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setIsLoading(true);
      const subscriptions = await getSubscriptionByQueries({ role, id: roleId });
      setSubscriptions(subscriptions);
      setIsLoading(false);
    } catch (e) {
      return e;
    } finally {
      setIsLoading(false);
    }
  }, [role, roleId]);

  const deleteSubscriptionById = async (id) => {
    try {
      setIsLoading(true);
      const necessarySubscription = subscriptions.find((subscription) => {
        return subscription._id === id;
      });
      const deletedSubscription = await deleteSubscription(necessarySubscription._id);
      await fetchSubscriptions();
      setIsLoading(false);
      return deletedSubscription;
    } catch (e) {
      return e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  useEffect(() => {
    socket.on('delete_subscription', (data) => {
      const deletedSubscription = subscriptions.find((subscription) => {
        return subscription._id === data;
      });
      if (deletedSubscription) {
        fetchSubscriptions();
      }
    });
  }, [fetchSubscriptions, subscriptions]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : subscriptions.length ? (
        <SubscriptionsTable
          subscriptions={subscriptions}
          role={role}
          deleteSubscriptionById={deleteSubscriptionById}
        />
      ) : (
        <NoSubscriptions subscribeTo='teacher' />
      )}
    </div>
  );
};

export default StudentSubscriptions;
