import { createSlice } from '@reduxjs/toolkit';

export const CompletionResourceKey = 'CompletionResource';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: CompletionResourceKey,
    initialState,
    reducers: {
        CompletionResourceBegin: Resource => {
            Resource.isLoading = true;
        },

        CompletionResourceSuccess: (Resource, action) => {
            Resource.isLoading = false;
            Resource.data = action.payload;
            Resource.error = undefined;
        },

        CompletionResourceFailure: (Resource, action) => {
            Resource.isLoading = false;
            Resource.error = action.payload;
            Resource.data = undefined;
        },
        CompletionResourceClear: Resource => {
            Resource.isLoading = false;
            Resource.error = undefined;
            Resource.data = undefined;
        },
    },
});

export default slice.reducer;
export const {
    CompletionResourceBegin,
    CompletionResourceClear,
    CompletionResourceFailure,
    CompletionResourceSuccess } =
    slice.actions;
