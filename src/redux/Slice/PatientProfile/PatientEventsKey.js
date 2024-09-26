import {createSlice} from '@reduxjs/toolkit';

export const PatientEventsKey = 'PatientEvents';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PatientEventsKey,
  initialState,
  reducers: {
    PatientEventBegin: PatientEvent => {
        PatientEvent.isLoading = true;
    },

    PatientEventSuccess: (PatientEvent, action) => {
        PatientEvent.isLoading = false;
        PatientEvent.data = action.payload;
        PatientEvent.error = undefined;
    },

    PatientEventFailure: (PatientEvent, action) => {
        PatientEvent.isLoading = false;
        PatientEvent.error = action.payload;
        PatientEvent.data = undefined;
    },
    PatientEventClear: PatientEvent => {
        PatientEvent.isLoading = false;
        PatientEvent.error = undefined;
        PatientEvent.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PatientEventBegin,PatientEventClear,PatientEventFailure,PatientEventSuccess} =
  slice.actions;
