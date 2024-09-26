import {createSlice} from '@reduxjs/toolkit';

export const HIPAAVerificationKey = 'HIPAAVerification';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: HIPAAVerificationKey,
  initialState,
  reducers: {
    HIPAAVerifyBegin: HIPAAVerification => {
        HIPAAVerification.isLoading = true;
    },

    HIPAAVerifySuccess: (HIPAAVerification, action) => {
        HIPAAVerification.isLoading = false;
        HIPAAVerification.data = action.payload;
        HIPAAVerification.error = undefined;
    },

    HIPAAVerifyFailure: (HIPAAVerification, action) => {
        HIPAAVerification.isLoading = false;
        HIPAAVerification.error = action.payload;
        HIPAAVerification.data = undefined;
    },

    HIPAAVerifyClear: HIPAAVerification => {
        HIPAAVerification.isLoading = false;
        HIPAAVerification.error = undefined;
        HIPAAVerification.data = undefined;
    },
  },
});

export default slice.reducer;
export const {HIPAAVerifySuccess,HIPAAVerifyFailure,HIPAAVerifyBegin,HIPAAVerifyClear} =
  slice.actions;
