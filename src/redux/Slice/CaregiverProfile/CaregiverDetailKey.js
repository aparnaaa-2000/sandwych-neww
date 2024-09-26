import {createSlice} from '@reduxjs/toolkit';

export const caregiverDetailsSliceKey = 'caregiverDetails';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: caregiverDetailsSliceKey,
  initialState,
  reducers: {
    caregiverDetailBegin: caregiverDetails => {
        caregiverDetails.isLoading = true;
    },

    caregiverDetailSuccess: (caregiverDetails, action) => {
        caregiverDetails.isLoading = false;
        caregiverDetails.data = action.payload;
        caregiverDetails.error = undefined;
    },

    caregiverDetailFailure: (caregiverDetails, action) => {
        caregiverDetails.isLoading = false;
        caregiverDetails.error = action.payload;
        caregiverDetails.data = undefined;
    },

    caregiverDetailClear: caregiverDetails => {
        caregiverDetails.isLoading = false;
        caregiverDetails.error = undefined;
        caregiverDetails.data = undefined;
    },
  },
});

export default slice.reducer;
export const {caregiverDetailSuccess, caregiverDetailFailure, caregiverDetailBegin,caregiverDetailClear} =
  slice.actions;
