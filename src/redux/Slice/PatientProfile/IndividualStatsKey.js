import {createSlice} from '@reduxjs/toolkit';

export const IndividualStatsSliceKey = 'IndividualStats';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: IndividualStatsSliceKey,
  initialState,
  reducers: {
    IndividualStatsBegin: IndividualStats => {
        IndividualStats.isLoading = true;
    },

    IndividualStatsSuccess: (IndividualStats, action) => {
        IndividualStats.isLoading = false;
        IndividualStats.data = action.payload;
        IndividualStats.error = undefined;
    },

    IndividualStatsFailure: (IndividualStats, action) => {
        IndividualStats.isLoading = false;
        IndividualStats.error = action.payload;
        IndividualStats.data = undefined;
    },
    IndividualStatsClear: IndividualStats => {
        IndividualStats.isLoading = false;
        IndividualStats.error = undefined;
        IndividualStats.data = undefined;
    },
  },
});

export default slice.reducer;
export const {IndividualStatsBegin,IndividualStatsClear,IndividualStatsFailure,IndividualStatsSuccess} =
  slice.actions;
