import { configureStore } from '@reduxjs/toolkit';
import approveStudentSlice from './approve-student-slice';
import snackbarSlice from './snackbar-slice';

const store = configureStore({
  reducer: {
    snackbar: snackbarSlice.reducer,
    approveStudent: approveStudentSlice.reducer,
  },
});

export default store;
