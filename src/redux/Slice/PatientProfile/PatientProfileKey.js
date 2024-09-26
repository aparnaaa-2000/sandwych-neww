import {createSlice} from '@reduxjs/toolkit';

export const PatientProfileSliceKey = 'PatientProfile';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PatientProfileSliceKey,
  initialState,
  reducers: {
    PatientProfileBegin: Profile => {
        Profile.isLoading = true;
    },

    PatientProfileSuccess: (Profile, action) => {
        Profile.isLoading = false;
        Profile.data = action.payload;
        Profile.error = undefined;
    },

    PatientProfileFailure: (Profile, action) => {
        Profile.isLoading = false;
        Profile.error = action.payload;
        Profile.data = undefined;
    },
    PatientProfileClear: Profile => {
        Profile.isLoading = false;
        Profile.error = undefined;
        Profile.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PatientProfileSuccess, PatientProfileFailure, PatientProfileBegin, PatientProfileClear} =
  slice.actions;
