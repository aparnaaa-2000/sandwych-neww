import {createSlice} from '@reduxjs/toolkit';

export const verifySliceKey = 'verify';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: verifySliceKey,
  initialState,
  reducers: {
    verifyBegin: verify => {
        verify.isLoading = true;
    },

    verifySuccess: (verify, action) => {
        verify.isLoading = false;

        verify.data = action.payload;
        verify.error = undefined;
    },

    verifyFailure: (verify, action) => {
        verify.isLoading = false;

        verify.error = action.payload;
        verify.data = undefined;
    },
    verifyClear: verify => {
        verify.isLoading = false;
        verify.error = undefined;
        verify.data = undefined;
    },
  },
});

export default slice.reducer;
export const {verifySuccess, verifyFailure, verifyBegin, verifyClear} =
  slice.actions;
