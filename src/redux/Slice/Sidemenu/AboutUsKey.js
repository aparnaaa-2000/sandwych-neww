import {createSlice} from '@reduxjs/toolkit';

export const aboutSliceKey = 'AboutUs';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: aboutSliceKey,
  initialState,
  reducers: {
    aboutBegin: about => {
        about.isLoading = true;
    },

    aboutSuccess: (about, action) => {
        about.isLoading = false;

        about.data = action.payload;
        about.error = undefined;
    },

    aboutFailure: (about, action) => {
        about.isLoading = false;

        about.error = action.payload;
        about.data = undefined;
    },
    aboutClear: about => {
        about.isLoading = false;
        about.error = undefined;
        about.data = undefined;
    },
  },
});

export default slice.reducer;
export const {aboutSuccess, aboutFailure, aboutBegin, aboutClear} =
  slice.actions;
