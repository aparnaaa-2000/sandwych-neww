import {createSlice} from '@reduxjs/toolkit';

export const getWeekPatientMoodKey = 'getWeekMood';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: getWeekPatientMoodKey,
  initialState,
  reducers: {
    getWeekBegin: getWeekMood => {
        getWeekMood.isLoading = true;
    },

    getWeekSuccess: (getWeekMood, action) => {
        getWeekMood.isLoading = false;
        getWeekMood.data = action.payload;
        getWeekMood.error = undefined;
    },

    getWeekFailure: (getWeekMood, action) => {
        getWeekMood.isLoading = false;
        getWeekMood.error = action.payload;
        getWeekMood.data = undefined;
    },
    getWeekClear: getWeekMood => {
        getWeekMood.isLoading = false;
        getWeekMood.error = undefined;
        getWeekMood.data = undefined;
    },
  },
});

export default slice.reducer;
export const {getWeekSuccess, getWeekFailure, getWeekBegin, getWeekClear} =
  slice.actions;
