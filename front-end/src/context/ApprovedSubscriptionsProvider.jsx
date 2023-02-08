import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { CurrentUserContext } from './AppProvider';

import { getSubscriptionByQueries } from 'services/subscriptionService';

import { socket } from 'services/socketService';

import { APPROVED } from 'constants/subscriptionStatuses';

export const ApprovedSubscriptionsContext = createContext();

const ApprovedSubscriptionsProvider = ({ children }) => {
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);

  const fetchSubscriptionsCount = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const response = await getSubscriptionByQueries({ statusName: APPROVED, id });
      setSubscriptionsCount(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    socket.on('subscription:updated', (subscription) => {
      if (subscription.studentID === roleId) {
        if (
          (subscription.status === APPROVED && subscriptionsCount === 0) ||
          (subscription.status !== APPROVED && subscriptionsCount === 1)
        ) {
          fetchSubscriptionsCount(roleId);
        }
      }
    });

    socket.on(
      'subscription:deleted',
      (subscription) =>
        subscription.studentID === roleId &&
        subscriptionsCount === 1 &&
        fetchSubscriptionsCount(roleId),
    );

    return () => {
      socket.off('subscription:updated');
      socket.off('subscription:deleted');
    };
  }, [roleId, fetchSubscriptionsCount, subscriptionsCount]);

  return (
    <ApprovedSubscriptionsContext.Provider
      value={{ subscriptionsCount, fetchSubscriptionsCount, isLoading }}
    >
      {children}
    </ApprovedSubscriptionsContext.Provider>
  );
};

ApprovedSubscriptionsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ApprovedSubscriptionsProvider;
