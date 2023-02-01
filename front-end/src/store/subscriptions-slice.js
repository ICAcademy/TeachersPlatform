import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubscriptionByQueries } from 'services/subscriptionService';

const initialState = { pendingSubscriptions: 0, approvedSubscriptions: 0 };

export const pendingSubscriptionsCount = createAsyncThunk(
  'subscriptions/pendingSubscriptionsCount',
  async (params) => {
    const subscriptions = await getSubscriptionByQueries(params);
    return subscriptions;
  },
);

export const approvedSubscriptionsCount = createAsyncThunk(
  'subscriptions/approvedSubscriptionsCount',
  async (params) => {
    const subscriptions = await getSubscriptionByQueries(params);
    return subscriptions;
  },
);

const subscriptionsCountSlice = createSlice({
  name: 'subscriptions',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(pendingSubscriptionsCount.fulfilled, (state, action) => {
      state.pendingSubscriptions = action.payload;
    });
    builder.addCase(approvedSubscriptionsCount.fulfilled, (state, action) => {
      state.approvedSubscriptions = action.payload;
    });
  },
});

export const subscriptionsCountActions = subscriptionsCountSlice.actions;

export default subscriptionsCountSlice;
