import {createSlice} from '@reduxjs/toolkit';

export const LegalDocListKey = 'LegalDocList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: LegalDocListKey,
  initialState,
  reducers: {
    LegalDocListBegin: LegalDocList => {
        LegalDocList.isLoading = true;
    },

    LegalDocListSuccess: (LegalDocList, action) => {
        LegalDocList.isLoading = false;
        LegalDocList.data = action.payload;
        LegalDocList.error = undefined;
    },

    LegalDocFailure: (LegalDocList, action) => {
        LegalDocList.isLoading = false;
        LegalDocList.error = action.payload;
        LegalDoc.data = undefined;
    },

    LegalDocListClear: LegalDocList => {
        LegalDocList.isLoading = false;
        LegalDocList.error = undefined;
        LegalDocList.data = undefined;
    },
  },
});

export default slice.reducer;
export const {LegalDocListSuccess,LegalDocListFailure,LegalDocListClear,LegalDocListBegin} =
  slice.actions;
