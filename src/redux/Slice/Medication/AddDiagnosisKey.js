import {createSlice} from '@reduxjs/toolkit';

export const AddDiagnosisKey = 'AddDiagnosis';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AddDiagnosisKey,
  initialState,
  reducers: {
    AddDiagnosisBegin: Diagnosis => {
        Diagnosis.isLoading = true;
    },

    AddDiganosisSuccess: (Diagnosis, action) => {
        Diagnosis.isLoading = false;
        Diagnosis.data = action.payload;
        Diagnosis.error = undefined;
    },

    AddDiagnosisFailure: (Diagnosis, action) => {
        Diagnosis.isLoading = false;
        Diagnosis.error = action.payload;
        Diagnosis.data = undefined;
    },

    AddDiagnosisClear: Diagnosis => {
        Diagnosis.isLoading = false;
        Diagnosis.error = undefined;
        Diagnosis.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AddDiagnosisBegin,AddDiagnosisClear,AddDiagnosisFailure,AddDiganosisSuccess} =
  slice.actions;
