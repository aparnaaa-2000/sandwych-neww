import {createSlice} from '@reduxjs/toolkit';

export const NearBySupportRequestKey = 'NearBySupportRequest';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

const slice = createSlice({
  name: NearBySupportRequestKey,
  initialState,
  reducers: {
    NearBySupportRequestBegin: support => {
        support.isLoading = true;
    },

    NearBySupportRequestSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    NearBySupportRequestFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    NearBySupportRequestClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {NearBySupportRequestBegin,NearBySupportRequestClear,NearBySupportRequestFailure,NearBySupportRequestSuccess} =
  slice.actions;
