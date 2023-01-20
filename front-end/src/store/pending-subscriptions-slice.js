import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubscriptionsCountByStatus } from 'services/subscriptionService';

const initialState = { subscriptions: 0 };

export const pendingSubscriptionsCount = createAsyncThunk(
  'subscriptions/pendingSubscriptionsCount',
  async (params) => {
    const subscriptions = await getSubscriptionsCountByStatus(params);
    return subscriptions;
  },
);

const pendinSubscriptionsCountSlice = createSlice({
  name: 'subscriptions',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(pendingSubscriptionsCount.fulfilled, (state, action) => {
      state.subscriptions = action.payload;
    });
  },
});

export const pendingCountActions = pendinSubscriptionsCountSlice.actions;

export default pendinSubscriptionsCountSlice;
