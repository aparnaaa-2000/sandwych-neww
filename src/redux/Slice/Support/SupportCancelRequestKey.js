import {createSlice} from '@reduxjs/toolkit';

export const SupportCancelRequestKey = 'SupportCancelRequest';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SupportCancelRequestKey,
  initialState,
  reducers: {
    supportCancelBegin: support => {
        support.isLoading = true;
    },

    supportCancelSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportCancelFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportCancelClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportCancelBegin,supportCancelClear,supportCancelFailure,supportCancelSuccess} =
  slice.actions;
