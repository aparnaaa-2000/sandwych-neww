import {createSlice} from '@reduxjs/toolkit';

export const OtpSliceKey = 'otp';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: OtpSliceKey,
  initialState,
  reducers: {
    OtpBegin: otp => {
        otp.isLoading = true;
    },

    otpSuccess: (otp, action) => {
        otp.isLoading = false;

        otp.data = action.payload;
        otp.error = undefined;
    },

    OtpFailure: (otp, action) => {
        otp.isLoading = false;

        otp.error = action.payload;
        otp.data = undefined;
    },
    OtpClear: otp => {
        otp.isLoading = false;
        otp.error = undefined;
        otp.data = undefined;
    },
  },
});

export default slice.reducer;
export const {otpSuccess,OtpFailure,OtpBegin,OtpClear} =
  slice.actions;
