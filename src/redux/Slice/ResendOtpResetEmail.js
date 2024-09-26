import {createSlice} from '@reduxjs/toolkit';

export const ResetOtpResendSliceKey = 'ResetOtpResend';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ResetOtpResendSliceKey,
  initialState,
  reducers: {
    ResendOtpResetBegin: otp => {
        otp.isLoading = true;
    },

    ResendOtpResetSuccess: (otp, action) => {
        otp.isLoading = false;

        otp.data = action.payload;
        otp.error = undefined;
    },

    ResendOtpResetFailure: (otp, action) => {
        otp.isLoading = false;

        otp.error = action.payload;
        otp.data = undefined;
    },
    ResendOtpResetClear: otp => {
        otp.isLoading = false;
        otp.error = undefined;
        otp.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ResendOtpResetSuccess,ResendOtpResetFailure,ResendOtpResetBegin,ResendOtpResetClear} =
  slice.actions;
