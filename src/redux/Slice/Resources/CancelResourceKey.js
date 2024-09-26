import { createSlice } from '@reduxjs/toolkit';

export const CancelResourceKey = 'CancelResource';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: CancelResourceKey,
    initialState,
    reducers: {
        CancelResourceBegin: Resource => {
            Resource.isLoading = true;
        },

        CancelResourceSuccess: (Resource, action) => {
            Resource.isLoading = false;
            Resource.data = action.payload;
            Resource.error = undefined;
        },

        CancelResourceFailure: (Resource, action) => {
            Resource.isLoading = false;
            Resource.error = action.payload;
            Resource.data = undefined;
        },
        CancelResourceClear: Resource => {
            Resource.isLoading = false;
            Resource.error = undefined;
            Resource.data = undefined;
        },
    },
});

export default slice.reducer;
export const {
    CancelResourceBegin,
    CancelResourceClear,
    CancelResourceFailure,
    CancelResourceSuccess } =
    slice.actions;
