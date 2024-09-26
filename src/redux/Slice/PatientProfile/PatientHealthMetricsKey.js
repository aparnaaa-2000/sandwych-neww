import {createSlice} from '@reduxjs/toolkit';

export const PatientHealthMetricsSliceKey = 'PatientHealthMetrics';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PatientHealthMetricsSliceKey,
  initialState,
  reducers: {
    PatientHealthMetricsBegin: PatientHealthMetrics => {
        PatientHealthMetrics.isLoading = true;
    },

    PatientHealthMetricsSuccess: (PatientHealthMetrics, action) => {
        PatientHealthMetrics.isLoading = false;
        PatientHealthMetrics.data = action.payload;
        PatientHealthMetrics.error = undefined;
    },

    PatientHealthMetricsFailure: (PatientHealthMetrics, action) => {
        PatientHealthMetrics.isLoading = false;
        PatientHealthMetrics.error = action.payload;
        PatientHealthMetrics.data = undefined;
    },
    PatientHealthMetricsClear: PatientHealthMetrics => {
        PatientHealthMetrics.isLoading = false;
        PatientHealthMetrics.error = undefined;
        PatientHealthMetrics.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PatientHealthMetricsBegin,PatientHealthMetricsFailure,PatientHealthMetricsSuccess,PatientHealthMetricsClear} =
  slice.actions;
