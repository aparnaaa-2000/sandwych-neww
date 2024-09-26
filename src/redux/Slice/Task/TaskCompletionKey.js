import {createSlice} from '@reduxjs/toolkit';

export const TaskStatusSliceKey = 'TaskStatus';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: TaskStatusSliceKey,
  initialState,
  reducers: {
    TaskStatusBegin: TaskStatus => {
        TaskStatus.isLoading = true;
    },

    TaskStatusSuccess: (TaskStatus, action) => {
        TaskStatus.isLoading = false;
        TaskStatus.data = action.payload;
        TaskStatus.error = undefined;
    },

    TaskStatusFailure: (TaskList, action) => {
        TaskList.isLoading = false;
        TaskList.error = action.payload;
        TaskList.data = undefined;
    },

    TaskStatusClear:TaskStatus => {
        TaskStatus.isLoading = false;
        TaskStatus.error = undefined;
        TaskStatus.data = undefined;
    },
  },
});

export default slice.reducer;
export const {TaskStatusBegin,TaskStatusClear,TaskStatusFailure,TaskStatusSuccess} =
  slice.actions;
