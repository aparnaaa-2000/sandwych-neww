import {createSlice} from '@reduxjs/toolkit';

export const OtpResendSliceKey = 'ResendOtp';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: OtpResendSliceKey,
  initialState,
  reducers: {
    OtpResendBegin: otp => {
        otp.isLoading = true;
    },

    OtpResendSuccess: (otp, action) => {
        otp.isLoading = false;

        otp.data = action.payload;
        otp.error = undefined;
    },

    OtpResendFailure: (otp, action) => {
        otp.isLoading = false;

        otp.error = action.payload;
        otp.data = undefined;
    },
    OtpResendClear: otp => {
        otp.isLoading = false;
        otp.error = undefined;
        otp.data = undefined;
    },
  },
});

export default slice.reducer;
export const {OtpResendSuccess,OtpResendFailure,OtpResendBegin,OtpResendClear} =
  slice.actions;
