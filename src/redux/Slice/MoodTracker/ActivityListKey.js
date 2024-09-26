import {createSlice} from '@reduxjs/toolkit';

export const getActivityListKey = 'getActivity';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: getActivityListKey,
  initialState,
  reducers: {
    getBegin: getactivity => {
        getactivity.isLoading = true;
    },

    getSuccess: (getactivity, action) => {
        getactivity.isLoading = false;

        getactivity.data = action.payload;
        getactivity.error = undefined;
    },

    getFailure: (getactivity, action) => {
        getactivity.isLoading = false;

        getactivity.error = action.payload;
        getactivity.data = undefined;
    },
    getClear: getactivity => {
        getactivity.isLoading = false;
        getactivity.error = undefined;
        getactivity.data = undefined;
    },
  },
});

export default slice.reducer;
export const {getSuccess, getFailure, getBegin, getClear} =
  slice.actions;
