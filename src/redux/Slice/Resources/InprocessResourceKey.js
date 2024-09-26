import { createSlice } from '@reduxjs/toolkit';

export const InprocessResourceKey = 'InprocessResource';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: InprocessResourceKey,
    initialState,
    reducers: {
        InprocessResourceBegin: Resource => {
            Resource.isLoading = true;
        },

        InprocessResourceSuccess: (Resource, action) => {
            Resource.isLoading = false;
            Resource.data = action.payload;
            Resource.error = undefined;
        },

        InprocessResourceFailure: (Resource, action) => {
            Resource.isLoading = false;
            Resource.error = action.payload;
            Resource.data = undefined;
        },
        InprocessResourceClear: Resource => {
            Resource.isLoading = false;
            Resource.error = undefined;
            Resource.data = undefined;
        },
    },
});

export default slice.reducer;
export const {
    InprocessResourceBegin,
    InprocessResourceClear,
    InprocessResourceFailure,
    InprocessResourceSuccess } =
    slice.actions;
