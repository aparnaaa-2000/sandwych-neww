import {createSlice} from '@reduxjs/toolkit';

export const resetSliceKey = 'reset';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: resetSliceKey,
  initialState,
  reducers: {
    resetBegin: reset => {
        reset.isLoading = true;
    },

    resetSuccess: (reset, action) => {
        reset.isLoading = false;

        reset.data = action.payload;
        reset.error = undefined;
    },

    resetFailure: (reset, action) => {
        reset.isLoading = false;

        reset.error = action.payload;
        reset.data = undefined;
    },
    resetClear: reset => {
        reset.isLoading = false;
        reset.error = undefined;
        reset.data = undefined;
    },
  },
});

export default slice.reducer;
export const {resetSuccess, resetFailure, resetBegin, resetClear} =
  slice.actions;
