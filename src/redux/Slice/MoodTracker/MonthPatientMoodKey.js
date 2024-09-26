import {createSlice} from '@reduxjs/toolkit';

export const getMonthPatientMoodKey = 'getMonthPatientMood';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: getMonthPatientMoodKey,
  initialState,
  reducers: {
    getMonthBegin: getMonthPatientMood => {
        getMonthPatientMood.isLoading = true;
    },

    getMonthSuccess: (getMonthPatientMood, action) => {
        getMonthPatientMood.isLoading = false;
        getMonthPatientMood.data = action.payload;
        getMonthPatientMood.error = undefined;
    },

    getMonthFailure: (getMonthPatientMood, action) => {
        getMonthPatientMood.isLoading = false;
        getMonthPatientMood.error = action.payload;
        getMonthPatientMood.data = undefined;
    },
    
    getMonthClear: getMonthPatientMood => {
        getMonthPatientMood.isLoading = false;
        getMonthPatientMood.error = undefined;
        getMonthPatientMood.data = undefined;
    },
  },
});

export default slice.reducer;
export const {getMonthSuccess, getMonthFailure, getMonthBegin, getMonthClear} =
  slice.actions;
