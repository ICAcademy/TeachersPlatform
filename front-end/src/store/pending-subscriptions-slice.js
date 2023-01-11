import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubcriptionsCountByStatus } from 'services/subscriptionService';

const initialState = { subscriptions: 0 };

export const pendingSubscriptionsCount = createAsyncThunk(
  'subscriptions/pendingSubscriptionsCount',
  async () => {
    const subscriptions = await getSubcriptionsCountByStatus({
      statusName: 'pending',
      id: '63b5469991ad99c97f6f9859',
    });
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
