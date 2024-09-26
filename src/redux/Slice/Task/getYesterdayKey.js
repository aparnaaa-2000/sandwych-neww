import {createSlice} from '@reduxjs/toolkit';

export const YesterdayTaskKey = 'YesterdayTask';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: YesterdayTaskKey,
  initialState,
  reducers: {
    YesterdayTaskBegin: YesterdayTask => {
        YesterdayTask.isLoading = true;
    },

    YesterdayTaskSuccess: (YesterdayTask, action) => {
        YesterdayTask.isLoading = false;
        YesterdayTask.data = action.payload;
        YesterdayTask.error = undefined;
    },

    YesterdayTaskFailure: (YesterdayTask, action) => {
        YesterdayTask.isLoading = false;
        YesterdayTask.error = action.payload;
        YesterdayTask.data = undefined;
    },

    YesterdayTaskClear:YesterdayTask => {
        YesterdayTask.isLoading = false;
        YesterdayTask.error = undefined;
        YesterdayTask.data = undefined;
    },
  },
});

export default slice.reducer;
export const {YesterdayTaskBegin,YesterdayTaskClear,YesterdayTaskFailure,YesterdayTaskSuccess} =
  slice.actions;
