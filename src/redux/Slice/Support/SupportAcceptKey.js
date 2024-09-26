import {createSlice} from '@reduxjs/toolkit';

export const SupportAcceptKey = 'SupportAccept';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

const slice = createSlice({
  name: SupportAcceptKey,
  initialState,
  reducers: {
    supportAcceptBegin: support => {
        support.isLoading = true;
    },

    supportAcceptSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportAcceptFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportAcceptClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportAcceptBegin,supportAcceptClear,supportAcceptFailure,supportAcceptSuccess} =
  slice.actions;
