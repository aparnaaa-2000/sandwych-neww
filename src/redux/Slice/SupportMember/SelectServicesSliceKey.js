import {createSlice} from '@reduxjs/toolkit';

export const selectServicesSliceKey = 'selectservices';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: selectServicesSliceKey,
  initialState,
  reducers: {
    selectservicesBegin: selectservices => {
      selectservices.isLoading = true;
    },

    selectservicesSuccess: (selectservices, action) => {
      selectservices.isLoading = false;

      selectservices.data = action.payload;
      selectservices.error = undefined;
    },

    selectservicesFailure: (selectservices, action) => {
      selectservices.isLoading = false;

      selectservices.error = action.payload;
      selectservices.data = undefined;
    },
    selectservicesClear: selectservices => {
      selectservices.isLoading = false;
      selectservices.error = undefined;
      selectservices.data = undefined;
    },
  },
});

export default slice.reducer;
export const {
  selectservicesSuccess,
  selectservicesFailure,
  selectservicesBegin,
  selectservicesClear,
} = slice.actions;
