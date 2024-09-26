import {createSlice} from '@reduxjs/toolkit';

export const CommunityNewsKey = 'CommunityNewKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: CommunityNewsKey,
  initialState,
  reducers: {
    newsDataBegin: newsData => {
        newsData.isLoading = true;
    },

    newsDataSuccess: (newsData, action) => {
        newsData.isLoading = false;
        newsData.data = action.payload;
        newsData.error = undefined;
    },

    newsDataFailure: (newsData, action) => {
        newsData.isLoading = false;
        newsData.error = action.payload;
        newsData.data = undefined;
    },
    newsDataClear: newsData => {
        newsData.isLoading = false;
        newsData.error = undefined;
        newsData.data = undefined;
    },
  },
});

export default slice.reducer;
export const {newsDataBegin,newsDataClear,newsDataFailure,newsDataSuccess} =
  slice.actions;
