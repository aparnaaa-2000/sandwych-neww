import {createSlice} from '@reduxjs/toolkit';

export const LegalDocKey = 'LegalDocuments';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: LegalDocKey,
  initialState,
  reducers: {
    LegalDocBegin: LegalDoc => {
        LegalDoc.isLoading = true;
    },

    LegalDocSuccess: (LegalDoc, action) => {
        LegalDoc.isLoading = false;
        LegalDoc.data = action.payload;
        LegalDoc.error = undefined;
    },
    MedicalDocSuccess: (LegalDoc, action) => {
      LegalDoc.isLoading = false;
      LegalDoc.data = action.payload;
      LegalDoc.error = undefined;
  },

    LegalDocFailure: (LegalDoc, action) => {
        LegalDoc.isLoading = false;
        LegalDoc.error = action.payload;
        LegalDoc.data = undefined;
    },

    LegalDocClear: LegalDoc => {
        LegalDoc.isLoading = false;
        LegalDoc.error = undefined;
        LegalDoc.data = undefined;
    },
  },
});

export default slice.reducer;
export const {LegalDocSuccess,LegalDocFailure,LegalDocClear,LegalDocBegin,MedicalDocSuccess} =
  slice.actions;
