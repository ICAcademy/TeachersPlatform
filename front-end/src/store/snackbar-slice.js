/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { snackbarShow: false, snackbarMessage: '', severity: '' };

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    show(state, action) {
      (state.snackbarShow = true),
        (state.snackbarMessage = action.payload.message),
        (state.severity = action.payload.severity);
    },
    hide(state) {
      state.snackbarShow = false;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice;
