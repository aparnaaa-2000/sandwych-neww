import {createSlice} from '@reduxjs/toolkit';

export const GetPatientStatsSliceKey = 'GetPatientStats';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: GetPatientStatsSliceKey,
  initialState,
  reducers: {
    GetPatientStatsBegin:  GetPatientStats => {
        GetPatientStats.isLoading = true;
    },

    GetPatientStatsSuccess: ( GetPatientStats, action) => {
        GetPatientStats.isLoading = false;
        GetPatientStats.data = action.payload;
        GetPatientStats.error = undefined;
    },

    GetPatientStatsFailure: ( GetPatientStats, action) => {
        GetPatientStats.isLoading = false;
        GetPatientStats.error = action.payload;
        GetPatientStats.data = undefined;
    },
    GetPatientStatsClear:  GetPatientStats => {
        GetPatientStats.isLoading = false;
        GetPatientStats.error = undefined;
        GetPatientStats.data = undefined;
    },
  },
});

export default slice.reducer;
export const {GetPatientStatsBegin,GetPatientStatsClear,GetPatientStatsFailure,GetPatientStatsSuccess} =
  slice.actions;
