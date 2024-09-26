import { createSlice } from '@reduxjs/toolkit';

export const UpdatePatientProfileSliceKey = 'UpdatePatientProfile';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name:UpdatePatientProfileSliceKey,
    initialState,
    reducers: {
        UpdatePatientProfileBegin: Profile => {
            Profile.isLoading = true;
        },

        UpdatePatientProfileSuccess: (Profile, action) => {
            Profile.isLoading = false;
            Profile.data = action.payload;
            Profile.error = undefined;
        },

        UpdatePatientProfileFailure: (Profile, action) => {
            Profile.isLoading = false;
            Profile.error = action.payload;
            Profile.data = undefined;
        },

        UpdatePatientProfileClear: Profile => {
            Profile.isLoading = false;
            Profile.error = undefined;
            Profile.data = undefined;
        },
    },
});

export default slice.reducer;
export const { UpdatePatientProfileSuccess, UpdatePatientProfileFailure, UpdatePatientProfileBegin, UpdatePatientProfileClear } =
    slice.actions;
