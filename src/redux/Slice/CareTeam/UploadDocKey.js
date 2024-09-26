import {createSlice} from '@reduxjs/toolkit';

export const UploadDocKey = 'UploadDocuments';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: UploadDocKey,
  initialState,
  reducers: {
    UploadDocBegin: UploadDoc => {
        UploadDoc.isLoading = true;
    },

    UploadDocSuccess: (UploadDoc, action) => {
        UploadDoc.isLoading = false;
        UploadDoc.data = action.payload;
        UploadDoc.error = undefined;
    },

    UploadDocFailure: (UploadDoc, action) => {
        UploadDoc.isLoading = false;
        UploadDoc.error = action.payload;
        UploadDoc.data = undefined;
    },

    UploadDocClear: UploadDoc => {
        UploadDoc.isLoading = false;
        UploadDoc.error = undefined;
        UploadDoc.data = undefined;
    },
  },
});

export default slice.reducer;
export const {UploadDocSuccess,UploadDocFailure,UploadDocClear,UploadDocBegin} =
  slice.actions;
