import {createSlice} from '@reduxjs/toolkit';

export const CareTeamKey = 'CareTeam';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,

};

const slice = createSlice({
  name: CareTeamKey,
  initialState,
  reducers: {
    CareTeamBegin: CareTeam => {
        CareTeam.isLoading = true;
    },

    CareTeamSuccess: (CareTeam, action) => {
        CareTeam.isLoading = false;
        CareTeam.data = action.payload;
        CareTeam.error = undefined;
    },

    CareTeamFailure: (CareTeam, action) => {
        CareTeam.isLoading = false;
        CareTeam.error = action.payload;
        CareTeam.data = undefined;
    },

    CareTeamClear: CareTeam => {
        CareTeam.isLoading = false;
        CareTeam.error = undefined;
        CareTeam.data = undefined;
    },
  },
});

export default slice.reducer;
export const {CareTeamSuccess,CareTeamFailure,CareTeamClear,CareTeamBegin} =
  slice.actions;
