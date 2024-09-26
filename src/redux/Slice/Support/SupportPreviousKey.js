import {createSlice} from '@reduxjs/toolkit';

export const SupportPreviousKey = 'SupportPrevious';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

const slice = createSlice({
  name: SupportPreviousKey,
  initialState,
  reducers: {
    supportPreviousBegin: support => {
        support.isLoading = true;
    },

    supportPreviousSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportPreviousFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportPreviousClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportPreviousBegin,supportPreviousClear,supportPreviousFailure,supportPreviousSuccess} =
  slice.actions;
