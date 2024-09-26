import {createSlice} from '@reduxjs/toolkit';

export const AddMedicationManualKey = 'AddMedicationManual';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AddMedicationManualKey,
  initialState,
  reducers: {
    AddMedicationManualBegin: Medication => {
        Medication.isLoading = true;
    },

    AddMedicationManualSuccess: (Medication, action) => {
        Medication.isLoading = false;
        Medication.data = action.payload;
        Medication.error = undefined;
    },

    AddMedicationManualFailure: (Medication, action) => {
        Medication.isLoading = false;
        Medication.error = action.payload;
        Medication.data = undefined;
    },

    AddMedicationManualClear: Medication => {
        Medication.isLoading = false;
        Medication.error = undefined;
        Medication.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AddMedicationManualBegin,AddMedicationManualClear,AddMedicationManualFailure,AddMedicationManualSuccess} =
  slice.actions;
