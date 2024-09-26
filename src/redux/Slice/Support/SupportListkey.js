import {createSlice} from '@reduxjs/toolkit';

export const SupportActivitySliceKey = 'SupportActivity';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SupportActivitySliceKey,
  initialState,
  reducers: {
    supportActivityBegin: support => {
        support.isLoading = true;
    },

    supportActivitySuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportActivityFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportActivityClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportActivityBegin,supportActivityClear,supportActivityFailure,supportActivitySuccess} =
  slice.actions;
