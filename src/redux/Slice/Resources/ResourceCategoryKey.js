import {createSlice} from '@reduxjs/toolkit';

export const ResourceCategorySliceKey = 'ResourceCategory';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ResourceCategorySliceKey,
  initialState,
  reducers: {
    ResourceCategoryBegin: Category => {
        Category.isLoading = true;
    },

    ResourceCategorySuccess: (Category, action) => {
        Category.isLoading = false;
        Category.data = action.payload;
        Category.error = undefined;
    },

    ResourceCategoryFailure: (Category, action) => {
        Category.isLoading = false;
        Category.error = action.payload;
        Category.data = undefined;
    },
    ResourceCategoryClear: Category => {
        Category.isLoading = false;
        Category.error = undefined;
        Category.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ResourceCategoryBegin,ResourceCategoryFailure,ResourceCategorySuccess,ResourceCategoryClear} =
  slice.actions;
