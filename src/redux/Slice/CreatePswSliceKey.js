import {createSlice} from '@reduxjs/toolkit';

export const CreatePSWSliceKey = 'create';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: CreatePSWSliceKey,
  initialState,
  reducers: {
    createBegin: create => {
        create.isLoading = true;
    },

    createSuccess: (create, action) => {
        create.isLoading = false;

        create.data = action.payload;
        create.error = undefined;
    },

    createFailure: (create, action) => {
        create.isLoading = false;

        create.error = action.payload;
        create.data = undefined;
    },
    createClear: create => {
        create.isLoading = false;
        create.error = undefined;
        create.data = undefined;
    },
  },
});

export default slice.reducer;
export const {createSuccess, createFailure, createBegin, createClear} =
  slice.actions;
