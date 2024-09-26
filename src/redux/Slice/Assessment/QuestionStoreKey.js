import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.value = action.payload;
    }

  },
});

export const {setQuestion} = valueSlice.actions;
export default valueSlice.reducer;
