import {createSlice} from '@reduxjs/toolkit';

export const PatientDietSliceKey = 'PatientDiet';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PatientDietSliceKey,
  initialState,
  reducers: {
    PatientDietBegin: PatientDiet => {
        PatientDiet.isLoading = true;
    },

    PatientDietSuccess: (PatientDiet, action) => {
        PatientDiet.isLoading = false;
        PatientDiet.data = action.payload;
        PatientDiet.error = undefined;
    },

    PatientDietFailure: (PatientDiet, action) => {
        PatientDiet.isLoading = false;
        PatientDiet.error = action.payload;
        PatientDiet.data = undefined;
    },
    PatientDietClear: PatientDiet => {
        PatientDiet.isLoading = false;
        PatientDiet.error = undefined;
        PatientDiet.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PatientDietBegin,PatientDietClear,PatientDietFailure,PatientDietSuccess} =
  slice.actions;
