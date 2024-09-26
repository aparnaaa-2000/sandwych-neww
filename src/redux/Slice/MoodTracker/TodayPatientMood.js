import {createSlice} from '@reduxjs/toolkit';

export const getTodayPatientMoodKey = 'getTodayPatientMood';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: getTodayPatientMoodKey,
  initialState,
  reducers: {
    getTodayMoodBegin: getTodayPatientMood => {
        getTodayPatientMood.isLoading = true;
    },

    getTodayMoodSuccess: (getTodayPatientMood, action) => {
        getTodayPatientMood.isLoading = false;
        getTodayPatientMood.data = action.payload;
        getTodayPatientMood.error = undefined;
    },

    getTodayMoodFailure: (getTodayPatientMood, action) => {
        getTodayPatientMood.isLoading = false;
        getTodayPatientMood.error = action.payload;
        getTodayPatientMood.data = undefined;
    },
    getTodayMoodClear: getTodayPatientMood => {
        getTodayPatientMood.isLoading = false;
        getTodayPatientMood.error = undefined;
        getTodayPatientMood.data = undefined;
    },
  },
});

export default slice.reducer;
export const {getTodayMoodSuccess, getTodayMoodFailure, getTodayMoodBegin, getTodayMoodClear} =
  slice.actions;
