import {createSlice} from '@reduxjs/toolkit';

export const registerSliceKey = 'register';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: registerSliceKey,
  initialState,
  reducers: {
    registerBegin: register => {
      register.isLoading = true;
    },

    registerSuccess: (register, action) => {
        register.isLoading = false;
        register.data = action.payload;
        register.error = undefined;
    },

    registerFailure: (register, action) => {
      register.isLoading = false;
      register.error = action.payload;
      register.data = undefined;
    },
    registerClear: register => {
      register.isLoading = false;
      register.error = undefined;
      register.data = undefined;
    },
  },
});

export default slice.reducer;
export const {registerSuccess,registerFailure,registerBegin, registerClear} =
  slice.actions;
