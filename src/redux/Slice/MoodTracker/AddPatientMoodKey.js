import {createSlice} from '@reduxjs/toolkit';

export const addPatientMoodKey = 'addPatientMood';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: addPatientMoodKey,
  initialState,
  reducers: {
    addMoodBegin: addPatientMood=> {
        addPatientMood.isLoading = true;
    },

    addMoodSuccess: (addPatientMood, action) => {
        addPatientMood.isLoading = false;
        addPatientMood.data = action.payload;
        addPatientMood.error = undefined;
    },

    addMoodFailure: (addPatientMood, action) => {
        addPatientMood.isLoading = false;
        addPatientMood.error = action.payload;
        addPatientMood.data = undefined;
    },
    addMoodClear: addPatientMood => {
        addPatientMood.isLoading = false;
        addPatientMood.error = undefined;
        addPatientMood.data = undefined;
    },
  },
});

export default slice.reducer;
export const {addMoodSuccess, addMoodFailure, addMoodBegin, addMoodClear} =
  slice.actions;
