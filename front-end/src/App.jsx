import React, { useCallback, useContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

// Router
import AppRouter from 'routes/AppRouter';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Store
import { pendingSubscriptionsCount } from 'store/pending-subscriptions-slice';

// Theme style
import theme from 'styles/customTheme';
import 'App.scss';

import { PENDING } from 'constants/subscriptionStatuses';
import { TEACHER_ROLE } from 'constants/userRoles';

const App = () => {
  const {
    fetchUser,
    currentUser: { role, roleId },
  } = useContext(CurrentUserContext);

  const dispatch = useDispatch();

  const fetchPendingSubscriptions = useCallback(() => {
    if (role === TEACHER_ROLE) {
      dispatch(pendingSubscriptionsCount({ statusName: PENDING, id: roleId }));
    }
  }, [dispatch, role, roleId]);

  useEffect(() => {
    fetchPendingSubscriptions();
  }, [fetchPendingSubscriptions]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className='wrap'>
        <AppRouter />
      </div>
    </ThemeProvider>
  );
};

export default App;
