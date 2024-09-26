import {createSlice} from '@reduxjs/toolkit';

export const SupportIncompletionKey = 'SupportIncompletion';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SupportIncompletionKey,
  initialState,
  reducers: {
    supportInCompletionBegin: support => {
        support.isLoading = true;
    },

    supportInCompletionSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportInCompletionFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportInCompletionClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportInCompletionBegin,supportInCompletionClear,supportInCompletionFailure,supportInCompletionSuccess} =
  slice.actions;
