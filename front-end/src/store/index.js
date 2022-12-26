import { configureStore } from '@reduxjs/toolkit';
import snackbarSlice from './snackbar-slice';

const store = configureStore({
  reducer: {
    snackbar: snackbarSlice.reducer,
  },
});

export default store;
