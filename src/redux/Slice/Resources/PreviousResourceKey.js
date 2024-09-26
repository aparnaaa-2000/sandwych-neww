import { createSlice } from '@reduxjs/toolkit';

export const PreviousResourceKey = 'PreviousResource';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: PreviousResourceKey,
    initialState,
    reducers: {
        PreviousResourceBegin: Resource => {
            Resource.isLoading = true;
        },

        PreviousResourceSuccess: (Resource, action) => {
            Resource.isLoading = false;
            Resource.data = action.payload;
            Resource.error = undefined;
        },

        PreviousResourceFailure: (Resource, action) => {
            Resource.isLoading = false;
            Resource.error = action.payload;
            Resource.data = undefined;
        },
        PreviousResourceClear: Resource => {
            Resource.isLoading = false;
            Resource.error = undefined;
            Resource.data = undefined;
        },
    },
});

export default slice.reducer;
export const {
    PreviousResourceBegin,
    PreviousResourceClear,
    PreviousResourceFailure,
    PreviousResourceSuccess } =
    slice.actions;
