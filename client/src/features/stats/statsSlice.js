import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStatsThunk } from './statsThunk';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  defaultStats: {},
  monthlyApplications: [],
};
export const getAllStats = createAsyncThunk('/stats', getStatsThunk);

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllStats.fulfilled, (state, { payload }) => {
      state.defaultStats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
      state.isLoading = false;
    });
    builder.addCase(getAllStats.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast(payload);
    });
  },
});

export default statsSlice.reducer;
