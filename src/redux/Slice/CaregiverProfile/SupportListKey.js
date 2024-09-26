import { createSlice } from '@reduxjs/toolkit';

export const SupportListSliceKey = 'SupportList';

const initialState = {
    isLoading: false,
    data: undefined,
    error: undefined,
    Id: undefined,
};

const slice = createSlice({
    name: SupportListSliceKey,
    initialState,
    reducers: {
        supportListBegin: SupportList => {
            SupportList.isLoading = true;
        },

        supportListSuccess: (SupportList, action) => {
            SupportList.isLoading = false;
            SupportList.data = action.payload;
            SupportList.error = undefined;
        },

        supportListFailure: (SupportList, action) => {
            SupportList.isLoading = false;
            SupportList.error = action.payload;
            SupportList.data = undefined;
        },
        supportListClear: SupportList => {
            SupportList.isLoading = false;
            SupportList.error = undefined;
            SupportList.data = undefined;
        },
    },
});

export default slice.reducer;
export const { supportListSuccess,supportListFailure,supportListBegin,supportListClear } =
    slice.actions;
