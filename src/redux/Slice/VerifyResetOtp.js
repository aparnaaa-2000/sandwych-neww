import {createSlice} from '@reduxjs/toolkit';

export const OtpRSliceKey = 'otp';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: OtpRSliceKey,
  initialState,
  reducers: {
    OtpRBegin: otp => {
        otp.isLoading = true;
    },

    OtpRSuccess: (otp, action) => {
        otp.isLoading = false;

        otp.data = action.payload;
        otp.error = undefined;
    },

    OtpRFailure: (otp, action) => {
        otp.isLoading = false;

        otp.error = action.payload;
        otp.data = undefined;
    },
    OtpRClear: otp => {
        otp.isLoading = false;
        otp.error = undefined;
        otp.data = undefined;
    },
  },
});

export default slice.reducer;
export const {OtpRSuccess,OtpRFailure,OtpRBegin,OtpRClear} =
  slice.actions;
