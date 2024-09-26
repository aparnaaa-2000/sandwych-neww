import {createSlice} from '@reduxjs/toolkit';

export const SupportMemberRequestkey = 'SupportMemberRequest';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SupportMemberRequestkey,
  initialState,
  reducers: {
    supportMemberReqBegin: support => {
        support.isLoading = true;
    },

    supportMemberReqSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportMemberReqFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportMemberReqClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportMemberReqBegin,supportMemberReqClear,supportMemberReqFailure,supportMemberReqSuccess} =
  slice.actions;
