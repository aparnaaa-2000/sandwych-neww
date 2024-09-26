import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  titleGroup: [],
  functionaPageName: '',
  task_Id: '',
  currentUser:[]
};

const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setAnswer: (state, action) => {
      state.value = action.payload;
    },
    setHealthAnswer: (state, action) => {
      state.value = action.payload;
    },
    setTaskId: (state, action) => {
      state.task_Id = action.payload;
    },
    setTitleGroup: (state, action) => {
      state.titleGroup = action.payload;
    },
    setFunctionaPageName: (state, action) => {
      state.functionaPageName = action.payload;
    },
    setEatingLevel: (state, action) => {
      state.value = action.payload;
    },
    setADLOption: (state, action) => {
      state.value = action.payload;
    },
    setEnrollTitles: (state, action) => {
      state.enroll_title = action.payload;
    },
    setCurrentUser:(state,action)=>{
      state.currentUser = action.payload;
    },
    setEditValue:(state,action)=>{
      state.EditValue = action.payload;
    },
    setTitleID:(state,action)=>{
      state.TitleID = action.payload;
    }
  },
});

export const {
  setValue,
  setTitleGroup,
  setAnswer,
  setHealthAnswer,
  setFunctionaPageName,
  setEatingLevel,
  setADLOption,
  setTaskId,
  setEnrollTitles,
  setCurrentUser,
  setEditValue,
  setTitleID
} = valueSlice.actions;

export default valueSlice.reducer;
