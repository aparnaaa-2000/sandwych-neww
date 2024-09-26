import {createSlice} from '@reduxjs/toolkit';

export const loginSliceKey = 'login';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: loginSliceKey,
  initialState,
  reducers: {
    loginBegin: login => {
        login.isLoading = true;
    },

    loginSuccess: (login, action) => {
        login.isLoading = false;

        login.data = action.payload;
        login.error = undefined;
    },

    loginFailure: (login, action) => {
        login.isLoading = false;

        login.error = action.payload;
        login.data = undefined;
    },
    loginClear: login => {
        login.isLoading = false;
        login.error = undefined;
        login.data = undefined;
    },
  },
});

export default slice.reducer;
export const {loginSuccess, loginFailure, loginBegin, loginClear} =
  slice.actions;
