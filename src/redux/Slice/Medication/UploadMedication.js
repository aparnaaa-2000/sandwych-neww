import {createSlice} from '@reduxjs/toolkit';

export const UploadMedicationKey = 'UploadMedication';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: UploadMedicationKey,
  initialState,
  reducers: {
    UploadMedicationBegin: Medication => {
        Medication.isLoading = true;
    },

    UploadMedicationSuccess: (Medication, action) => {
        Medication.isLoading = false;
        Medication.data = action.payload;
        Medication.error = undefined;
    },

    UploadMedicationFailure: (Medication, action) => {
        Medication.isLoading = false;
        Medication.error = action.payload;
        Medication.data = undefined;
    },

    UploadMedicationClear: Medication => {
        Medication.isLoading = false;
        Medication.error = undefined;
        Medication.data = undefined;
    },
  },
});

export default slice.reducer;
export const {UploadMedicationBegin,UploadMedicationClear,UploadMedicationFailure,UploadMedicationSuccess } =
  slice.actions;
