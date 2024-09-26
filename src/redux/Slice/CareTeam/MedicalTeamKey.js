import {createSlice} from '@reduxjs/toolkit';

export const MedTeamKey = 'MedTeam';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: MedTeamKey,
  initialState,
  reducers: {
    MedTeamBegin: MedTeam => {
        MedTeam.isLoading = true;
    },

    MedTeamSuccess: (MedTeam, action) => {
        MedTeam.isLoading = false;
        MedTeam.data = action.payload;
        MedTeam.error = undefined;
    },

    MedTeamFailure: (MedTeam, action) => {
        MedTeam.isLoading = false;
        MedTeam.error = action.payload;
        MedTeam.data = undefined;
    },

    MedTeamClear: MedTeam => {
        MedTeam.isLoading = false;
        MedTeam.error = undefined;
        MedTeam.data = undefined;
    },
  },
});

export default slice.reducer;
export const {MedTeamSuccess,MedTeamFailure,MedTeamClear,MedTeamBegin} =
  slice.actions;
