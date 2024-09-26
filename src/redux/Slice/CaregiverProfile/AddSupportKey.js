import {createSlice} from '@reduxjs/toolkit';

export const AddSupportKey = 'AddSupport';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AddSupportKey,
  initialState,
  reducers: {
    AddSupportBegin: AddSupport => {
        AddSupport.isLoading = true;
    },

    AddSupportSuccess: (AddSupport, action) => {
        AddSupport.isLoading = false;
        AddSupport.data = action.payload;
        AddSupport.error = undefined;
    },

    AddSupportFailure: (AddSupport, action) => {
        AddSupport.isLoading = false;
        AddSupport.error = action.payload;
        AddSupport.data = undefined;
    },

    AddSupportClear: AddSupport => {
        AddSupport.isLoading = false;
        AddSupport.error = undefined;
        AddSupport.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AddSupportSuccess,AddSupportFailure,AddSupportClear,AddSupportBegin} =
  slice.actions;
