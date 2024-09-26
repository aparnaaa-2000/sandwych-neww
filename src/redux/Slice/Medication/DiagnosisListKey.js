import {createSlice} from '@reduxjs/toolkit';

export const DiagnosisListKey = 'DiagnosisList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

const slice = createSlice({
  name: DiagnosisListKey,
  initialState,
  reducers: {
    DiagnosislistBegin: Diagnosis => {
        Diagnosis.isLoading = true;
    },

    DiagnosislistSuccess: (Diagnosis, action) => {
        Diagnosis.isLoading = false;
        Diagnosis.data = action.payload;
        Diagnosis.error = undefined;
    },

    DiagnosislistFailure: (Diagnosis, action) => {
        Diagnosis.isLoading = false;
        Diagnosis.error = action.payload;
        Diagnosis.data = undefined;
    },

    DiagnosislistClear: Diagnosis => {
        Diagnosis.isLoading = false;
        Diagnosis.error = undefined;
        Diagnosis.data = undefined;
    },
  },
});

export default slice.reducer;
export const {DiagnosislistBegin,DiagnosislistClear,DiagnosislistFailure,DiagnosislistSuccess} =
  slice.actions;
