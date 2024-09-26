import {createSlice} from '@reduxjs/toolkit';

export const MedicationTaskSubmitKey = 'MedicationTaskSubmit';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: MedicationTaskSubmitKey,
  initialState,
  reducers: {
    MedicationTaskSubmitBegin: Medication => {
        Medication.isLoading = true;
    },

    MedicationTaskSubmitSuccess: (Medication, action) => {
        Medication.isLoading = false;
        Medication.data = action.payload;
        Medication.error = undefined;
    },

    MedicationTaskSubmitFailure: (Medication, action) => {
        Medication.isLoading = false;
        Medication.error = action.payload;
        Medication.data = undefined;
    },

    MedicationTaskSubmitClear: Medication => {
        Medication.isLoading = false;
        Medication.error = undefined;
        Medication.data = undefined;
    },
  },
});

export default slice.reducer;
export const {MedicationTaskSubmitBegin,MedicationTaskSubmitClear,MedicationTaskSubmitFailure,MedicationTaskSubmitSuccess} =
  slice.actions;
