import { createSlice } from '@reduxjs/toolkit';

export const EditPatientProfileSliceKey = 'EditPatientProfile';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: EditPatientProfileSliceKey,
    initialState,
    reducers: {
        EditPatientProfileBegin: Profile => {
            Profile.isLoading = true;
        },

        EditPatientProfileSuccess: (Profile, action) => {
            Profile.isLoading = false;
            Profile.data = action.payload;
            Profile.error = undefined;
        },

        EditPatientProfileFailure: (Profile, action) => {
            Profile.isLoading = false;
            Profile.error = action.payload;
            Profile.data = undefined;
        },
        EditPatientProfileClear: Profile => {
            Profile.isLoading = false;
            Profile.error = undefined;
            Profile.data = undefined;
        },
    },
});

export default slice.reducer;
export const { EditPatientProfileSuccess, EditPatientProfileFailure, EditPatientProfileBegin, EditPatientProfileClear } =
    slice.actions;
