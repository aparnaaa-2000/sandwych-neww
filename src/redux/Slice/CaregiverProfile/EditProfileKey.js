import {createSlice} from '@reduxjs/toolkit';

export const GetEditProfileKey = 'GetEditProfile';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: GetEditProfileKey,
  initialState,
  reducers: {
    GetEditProfileBegin: GetEditCaregiverProfile => {
      GetEditCaregiverProfile.isLoading = true;
    },

    GetEditProfileSuccess: (GetCaregiverProfile, action) => {
        GetCaregiverProfile.isLoading = false;
        GetCaregiverProfile.data = action.payload;
        GetCaregiverProfile.error = undefined;
    },

    GetEditProfileFailure: (GetCaregiverProfile, action) => {
        GetCaregiverProfile.isLoading = false;
        GetCaregiverProfile.error = action.payload;
        GetCaregiverProfile.data = undefined;
    },

    GetEditProfileClear: GetCaregiverProfile => {
        GetCaregiverProfile.isLoading = false;
        GetCaregiverProfile.error = undefined;
        GetCaregiverProfile.data = undefined;
    },
  },
});

export default slice.reducer;
export const {GetEditProfileSuccess,GetEditProfileFailure,GetEditProfileClear,GetEditProfileBegin} =
  slice.actions;
