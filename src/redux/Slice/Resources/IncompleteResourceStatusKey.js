import { createSlice } from '@reduxjs/toolkit';

export const IncompleteResourceKey = 'IncompleteResource';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: IncompleteResourceKey,
    initialState,
    reducers: {
        IncompleteResourceBegin: Resource => {
            Resource.isLoading = true;
        },

        IncompleteResourceSuccess: (Resource, action) => {
            Resource.isLoading = false;
            Resource.data = action.payload;
            Resource.error = undefined;
        },

        IncompleteResourceFailure: (Resource, action) => {
            Resource.isLoading = false;
            Resource.error = action.payload;
            Resource.data = undefined;
        },
        IncompleteResourceClear: Resource => {
            Resource.isLoading = false;
            Resource.error = undefined;
            Resource.data = undefined;
        },
    },
});

export default slice.reducer;
export const {
IncompleteResourceBegin,
IncompleteResourceClear,
IncompleteResourceFailure,
IncompleteResourceSuccess } =
    slice.actions;
