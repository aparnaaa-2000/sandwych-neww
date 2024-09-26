import {createSlice} from '@reduxjs/toolkit';

export const SupportMemberListkey = 'SupportMemberList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SupportMemberListkey,
  initialState,
  reducers: {
    supportMemberListBegin: support => {
        support.isLoading = true;
    },

    supportMemberListSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportMemberListFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportMemberListClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportMemberListClear,supportMemberListFailure,supportMemberListBegin,supportMemberListSuccess} =
  slice.actions;
