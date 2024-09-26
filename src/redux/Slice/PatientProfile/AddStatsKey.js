import {createSlice} from '@reduxjs/toolkit';

export const AddStatsSliceKey = 'AddStats';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AddStatsSliceKey,
  initialState,
  reducers: {
    AddStatsBegin: AddStats => {
        AddStats.isLoading = true;
    },

    AddStatsSuccess: (AddStats, action) => {
        AddStats.isLoading = false;
        AddStats.data = action.payload;
        AddStats.error = undefined;
    },

    AddStatsFailure: (AddStats, action) => {
        AddStats.isLoading = false;
        AddStats.error = action.payload;
        AddStats.data = undefined;
    },
    AddStatsClear: AddStats => {
        AddStats.isLoading = false;
        AddStats.error = undefined;
        AddStats.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AddStatsBegin, AddStatsClear, AddStatsSuccess,AddStatsFailure} =
  slice.actions;
