import {createSlice} from '@reduxjs/toolkit';

export const UpdateProfileKey = 'UpdateProfile';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: UpdateProfileKey,
  initialState,
  reducers: {
    UpdateProfileBegin: UpdateCaregiverProfile => {
        UpdateCaregiverProfile.isLoading = true;
    },

    UpdateProfileSuccess: (UpdateCaregiverProfile, action) => {
        UpdateCaregiverProfile.isLoading = false;
        UpdateCaregiverProfile.data = action.payload;
        UpdateCaregiverProfile.error = undefined;
    },

    UpdateProfileFailure: (UpdateCaregiverProfile, action) => {
        UpdateCaregiverProfile.isLoading = false;
        UpdateCaregiverProfile.error = action.payload;
        UpdateCaregiverProfile.data = undefined;
    },

    UpdateProfileClear: UpdateCaregiverProfile => {
        UpdateCaregiverProfile.isLoading = false;
        UpdateCaregiverProfile.error = undefined;
        UpdateCaregiverProfile.data = undefined;
    },
  },
});

export default slice.reducer;
export const {UpdateProfileSuccess,UpdateProfileFailure,UpdateProfileClear,UpdateProfileBegin} =
  slice.actions;
