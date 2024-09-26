import {createSlice} from '@reduxjs/toolkit';

export const AddPatientAccesskey = 'AddPatientAccesskey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AddPatientAccesskey,
  initialState,
  reducers: {
    AddPatientaccessBegin: AddAccess => {
        AddAccess.isLoading = true;
    },

    AddPatientaccessSuccess: (AddAccess, action) => {
        AddAccess.isLoading = false;
        AddAccess.data = action.payload;
        AddAccess.error = undefined;
    },

    AddPatientaccessFailure: (AddAccess, action) => {
        AddAccess.isLoading = false;
        AddAccess.error = action.payload;
        AddAccess.data = undefined;
    },
    AddPatientaccessClear: AddAccess => {
        AddAccess.isLoading = false;
        AddAccess.error = undefined;
        AddAccess.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AddPatientaccessBegin,AddPatientaccessClear,AddPatientaccessFailure,AddPatientaccessSuccess} =
  slice.actions;
