import { configureStore } from '@reduxjs/toolkit';
import subscriptionsSlice from './subscriptions-slice';
import snackbarSlice from './snackbar-slice';

const store = configureStore({
  reducer: {
    snackbar: snackbarSlice.reducer,
    subscriptions: subscriptionsSlice.reducer,
  },
});

export default store;
