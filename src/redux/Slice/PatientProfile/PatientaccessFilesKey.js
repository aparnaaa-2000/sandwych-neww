import {createSlice} from '@reduxjs/toolkit';

export const PatientaccessFilesKey = 'PatientaccessFilesKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PatientaccessFilesKey,
  initialState,
  reducers: {
    PatientaccessFilesBegin: PatientFiles => {
        PatientFiles.isLoading = true;
    },

    PatientaccessFilesSuccess: (PatientFiles, action) => {
        PatientFiles.isLoading = false;
        PatientFiles.data = action.payload;
        PatientFiles.error = undefined;
    },

    PatientaccessFilesFailure: (PatientFiles, action) => {
        PatientFiles.isLoading = false;
        PatientFiles.error = action.payload;
        PatientFiles.data = undefined;
    },
    PatientaccessFilesClear: PatientFiles => {
        PatientFiles.isLoading = false;
        PatientFiles.error = undefined;
        PatientFiles.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PatientaccessFilesBegin,PatientaccessFilesClear,PatientaccessFilesFailure,PatientaccessFilesSuccess} =
  slice.actions;
