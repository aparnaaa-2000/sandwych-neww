import {createSlice} from '@reduxjs/toolkit';

export const TaskCategorySliceKey = 'TaskCategory';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: TaskCategorySliceKey,
  initialState,
  reducers: {
    TaskCategoryBegin: TaskCategory => {
        TaskCategory.isLoading = true;
    },

    TaskCategorySuccess: (TaskCategory, action) => {
        TaskCategory.isLoading = false;

        TaskCategory.data = action.payload;
        TaskCategory.error = undefined;
    },

    TaskCategoryFailure: (TaskCategory, action) => {
        TaskCategory.isLoading = false;
        TaskCategory.error = action.payload;
        TaskCategory.data = undefined;
    },
    TaskCategoryClear: TaskCategory => {
        TaskCategory.isLoading = false;
        TaskCategory.error = undefined;
        TaskCategory.data = undefined;
    },
  },
});

export default slice.reducer;
export const {TaskCategoryBegin,TaskCategoryClear,TaskCategoryFailure,TaskCategorySuccess} =
  slice.actions;
