import {createSlice} from '@reduxjs/toolkit';

export const SupportInProcessKey = 'SupportInProcess';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SupportInProcessKey,
  initialState,
  reducers: {
    supportInprocessBegin: support => {
        support.isLoading = true;
    },

    supportInprocessSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportInprocessFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportInprocessClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportInprocessBegin,supportInprocessClear,supportInprocessFailure,supportInprocessSuccess} =
  slice.actions;
