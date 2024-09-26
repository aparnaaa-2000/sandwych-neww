import {createSlice} from '@reduxjs/toolkit';

export const verifyRSliceKey = 'verify';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: verifyRSliceKey,
  initialState,
  reducers: {
    verifyRBegin: verify => {
        verify.isLoading = true;
    },

    verifyRSuccess: (verify, action) => {
        verify.isLoading = false;

        verify.data = action.payload;
        verify.error = undefined;
    },

    verifyRFailure: (verify, action) => {
        verify.isLoading = false;

        verify.error = action.payload;
        verify.data = undefined;
    },
    verifyRClear: verify => {
        verify.isLoading = false;
        verify.error = undefined;
        verify.data = undefined;
    },
  },
});

export default slice.reducer;
export const {verifyRSuccess, verifyRFailure, verifyRBegin, verifyRClear} =
  slice.actions;
