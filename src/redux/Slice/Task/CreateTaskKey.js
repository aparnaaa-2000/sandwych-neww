import {createSlice} from '@reduxjs/toolkit';

export const CreateTaskSliceKey = 'CreateTask';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: CreateTaskSliceKey,
  initialState,
  reducers: {
    CreateTaskBegin: CreateTask => {
        CreateTask.isLoading = true;
    },

    CreateTaskSuccess: (CreateTask, action) => {
        CreateTask.isLoading = false;
        CreateTask.data = action.payload;
        CreateTask.error = undefined;
    },

    CreateTaskFailure: (CreateTask, action) => {
        CreateTask.isLoading = false;
        CreateTask.error = action.payload;
        CreateTask.data = undefined;
    },
    CreateTaskClear:CreateTask => {
        CreateTask.isLoading = false;
        CreateTask.error = undefined;
        CreateTask.data = undefined;
    },
  },
});

export default slice.reducer;
export const {CreateTaskBegin,CreateTaskFailure,CreateTaskSuccess,CreateTaskClear} =
  slice.actions;
