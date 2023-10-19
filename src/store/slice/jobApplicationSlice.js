import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const jobApplicationSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {
    applyJob: (state, action) => {
      const { userId, jobId } = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      state[userId].push(jobId);
    },
    blockApplication: (state, action) => {
      const { jobId } = action.payload;
      state[jobId] = false;
    },
  },
});

export const { applyJob, blockApplication } = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;
