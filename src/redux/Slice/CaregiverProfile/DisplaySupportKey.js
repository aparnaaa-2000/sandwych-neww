import { createSlice } from '@reduxjs/toolkit';

export const DisplaySupportKey = 'DisplaySupport';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: DisplaySupportKey,
    initialState,
    reducers: {
        DisplaySupportBegin: DisplaySupport => {
            DisplaySupport.isLoading = true;
        },

        DisplaySupportSuccess: (DisplaySupport, action) => {
            DisplaySupport.isLoading = false;
            DisplaySupport.data = action.payload;
            DisplaySupport.error = undefined;
        },

        DisplaySupportFailure: (DisplaySupport, action) => {
            DisplaySupport.isLoading = false;
            DisplaySupport.error = action.payload;
            DisplaySupport.data = undefined;
        },
        DisplaySupportClear: DisplaySupport => {
            DisplaySupport.isLoading = false;
            DisplaySupport.error = undefined;
            DisplaySupport.data = undefined;
        },
    },
});

export default slice.reducer;
export const { DisplaySupportBegin,DisplaySupportClear,DisplaySupportSuccess,DisplaySupportFailure } =
    slice.actions;
