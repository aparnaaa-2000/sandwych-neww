import {createSlice} from '@reduxjs/toolkit';

export const MedicationTaskListKey = 'MedicationTaskList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: MedicationTaskListKey,
  initialState,
  reducers: {
    MedicationTasklistBegin: Medication => {
        Medication.isLoading = true;
    },

    MedicationTasklistSuccess: (Medication, action) => {
        Medication.isLoading = false;
        Medication.data = action.payload;
        Medication.error = undefined;
    },

    MedicationTasklistFailure: (Medication, action) => {
        Medication.isLoading = false;
        Medication.error = action.payload;
        Medication.data = undefined;
    },

    MedicationTasklistClear: Medication => {
        Medication.isLoading = false;
        Medication.error = undefined;
        Medication.data = undefined;
    },
  },
});

export default slice.reducer;
export const {MedicationTasklistBegin,MedicationTasklistClear,MedicationTasklistFailure,MedicationTasklistSuccess} =
  slice.actions;
