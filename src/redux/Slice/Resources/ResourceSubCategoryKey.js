import {createSlice} from '@reduxjs/toolkit';

export const ResourceSubCategorySliceKey = 'ResourceSubCategory';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ResourceSubCategorySliceKey,
  initialState,
  reducers: {
    ResourceSubCategoryBegin: subCategory => {
        subCategory.isLoading = true;
    },

    ResourceSubCategorySuccess: (subCategory, action) => {
        subCategory.isLoading = false;
        subCategory.data = action.payload;
        subCategory.error = undefined;
    },

    ResourceSubCategoryFailure: (subCategory, action) => {
        subCategory.isLoading = false;

        subCategory.error = action.payload;
        subCategory.data = undefined;
    },
    ResourceSubCategoryClear: subCategory => {
        subCategory.isLoading = false;
        subCategory.error = undefined;
        subCategory.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ResourceSubCategoryBegin,ResourceSubCategoryFailure,ResourceSubCategorySuccess,ResourceSubCategoryClear} =
  slice.actions;
