import {createSlice} from '@reduxjs/toolkit';

export const MedicationTaskListYesterdayKey = 'MedicationTaskListYesterday';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

const slice = createSlice({
  name: MedicationTaskListYesterdayKey,
  initialState,
  reducers: {
    MedicationTaskListYesterdayBegin: MedTask => {
        MedTask.isLoading = true;
    },

    MedicationTaskListYesterdaySuccess: (MedTask, action) => {
        MedTask.isLoading = false;
        MedTask.data = action.payload;
        MedTask.error = undefined;
    },

    MedicationTaskListYesterdayFailure: (MedTask, action) => {
        MedTask.isLoading = false;
        MedTask.error = action.payload;
        MedTask.data = undefined;
    },

    MedicationTaskListYesterdayClear:MedTask => {
        MedTask.isLoading = false;
        MedTask.error = undefined;
        MedTask.data = undefined;
    },
  },
});

export default slice.reducer;
export const {MedicationTaskListYesterdayBegin,MedicationTaskListYesterdayClear,MedicationTaskListYesterdayFailure,MedicationTaskListYesterdaySuccess} =
  slice.actions;
