import { createSlice } from '@reduxjs/toolkit';

const initialState = { approved: false, reject: false };

const approveStudentSlice = createSlice({
  name: 'approveStudent',
  initialState,
  reducers: {
    approve(state) {
      state.approved = !state.approved;
    },
    reject(state) {
      state.approved = false;
    },
  },
});

export const approvedActions = approveStudentSlice.actions;

export default approveStudentSlice;
