import {createSlice} from '@reduxjs/toolkit';

export const profileSupportSliceKey = 'profilesupport';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: profileSupportSliceKey,
  initialState,
  reducers: {
    profilesupportBegin: profilesupport => {
      profilesupport.isLoading = true;
    },

    profilesupportSuccess: (profilesupport, action) => {
      profilesupport.isLoading = false;

      profilesupport.data = action.payload;
      profilesupport.error = undefined;
    },

    profilesupportFailure: (profilesupport, action) => {
      profilesupport.isLoading = false;

      profilesupport.error = action.payload;
      profilesupport.data = undefined;
    },
    profilesupportClear: profilesupport => {
      profilesupport.isLoading = false;
      profilesupport.error = undefined;
      profilesupport.data = undefined;
    },
  },
});

export default slice.reducer;
export const {
  profilesupportSuccess,
  profilesupportFailure,
  profilesupportBegin,
  profilesupportClear,
} = slice.actions;
