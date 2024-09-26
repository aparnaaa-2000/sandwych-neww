import {createSlice} from '@reduxjs/toolkit';

export const EditSupportKey = 'EditSupport';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: EditSupportKey,
  initialState,
  reducers: {
    EditSupportBegin: EditSupport => {
        EditSupport.isLoading = true;
    },

    EditSupportSuccess: (EditSupport, action) => {
        EditSupport.isLoading = false;
        EditSupport.data = action.payload;
        EditSupport.error = undefined;
    },

    EditSupportFailure: (EditSupport, action) => {
        EditSupport.isLoading = false;
        EditSupport.error = action.payload;
        EditSupport.data = undefined;
    },

    EditSupportClear: EditSupport => {
        EditSupport.isLoading = false;
        EditSupport.error = undefined;
        EditSupport.data = undefined;
    },
  },
});

export default slice.reducer;
export const {EditSupportBegin,EditSupportSuccess,EditSupportClear,EditSupportFailure} =
  slice.actions;
