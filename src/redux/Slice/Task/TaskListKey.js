import {createSlice} from '@reduxjs/toolkit';

export const TaskListSliceKey = 'TaskList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: TaskListSliceKey,
  initialState,
  reducers: {
    TaskListBegin: TaskList => {
        TaskList.isLoading = true;
    },

    TaskListSuccess: (TaskList, action) => {
        TaskList.isLoading = false;
        TaskList.data = action.payload;
        TaskList.error = undefined;
    },

    TaskListFailure: (TaskList, action) => {
        TaskList.isLoading = false;
        TaskList.error = action.payload;
        TaskList.data = undefined;
    },

    TaskListClear:TaskList => {
        TaskList.isLoading = false;
        TaskList.error = undefined;
        TaskList.data = undefined;
    },
  },
});

export default slice.reducer;
export const {TaskListBegin,TaskListClear,TaskListFailure,TaskListSuccess} =
  slice.actions;
