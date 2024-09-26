import {createSlice} from '@reduxjs/toolkit';

export const supportRegisterSliceKey = 'supportregister';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: supportRegisterSliceKey,
  initialState,
  reducers: {
    supportregisterBegin: supportregister => {
        supportregister.isLoading = true;
    },

    supportregisterSuccess: (supportregister, action) => {
        supportregister.isLoading = false;

        supportregister.data = action.payload;
        supportregister.error = undefined;
    },

    supportregisterFailure: (supportregister, action) => {
        supportregister.isLoading = false;

        supportregister.error = action.payload;
        supportregister.data = undefined;
    },
    supportregisterClear: supportregister => {
        supportregister.isLoading = false;
        supportregister.error = undefined;
        supportregister.data = undefined;
    },
  },
});

export default slice.reducer;
export const {
    supportregisterSuccess,
    supportregisterFailure,
    supportregisterBegin,
    supportregisterClear,
} = slice.actions;
