import {createSlice} from '@reduxjs/toolkit';

export const patientListSliceKey = 'patientList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: patientListSliceKey,
  initialState,
  reducers: {
    patientListBegin: patientList => {
        patientList.isLoading = true;
    },

    patientListSuccess: (patientList, action) => {
        patientList.isLoading = false;
        patientList.data = action.payload;
        patientList.error = undefined;
    },

    patientListFailure: (patientList, action) => {
        patientList.isLoading = false;
        patientList.error = action.payload;
        patientList.data = undefined;
    },

    patientListClear: patientList => {
        patientList.isLoading = false;
        patientList.error = undefined;
        patientList.data = undefined;
    },
  },
});

export default slice.reducer;
export const {patientListSuccess, patientListFailure, patientListBegin,patientListClear} =
  slice.actions;
