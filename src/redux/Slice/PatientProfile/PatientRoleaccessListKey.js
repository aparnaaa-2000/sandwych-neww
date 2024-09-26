import {createSlice} from '@reduxjs/toolkit';

export const PatientRoleaccessKey = 'PatientRoleaccessKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PatientRoleaccessKey,
  initialState,
  reducers: {
    PatientRoleaccessBegin: PatientRole => {
        PatientRole.isLoading = true;
    },

    PatientRoleaccessSuccess: (PatientRole, action) => {
        PatientRole.isLoading = false;
        PatientRole.data = action.payload;
        PatientRole.error = undefined;
    },

    PatientRoleaccessFailure: (PatientRole, action) => {
        PatientRole.isLoading = false;
        PatientRole.error = action.payload;
        PatientRole.data = undefined;
    },
    PatientRoleaccessClear: PatientRole => {
        PatientRole.isLoading = false;
        PatientRole.error = undefined;
        PatientRole.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PatientRoleaccessBegin,PatientRoleaccessClear,PatientRoleaccessFailure,PatientRoleaccessSuccess} =
  slice.actions;
