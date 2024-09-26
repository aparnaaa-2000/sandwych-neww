import { createSlice } from '@reduxjs/toolkit';

export const ResourceNetworkRequestKey = 'ResourceNetworkRequest';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ResourceNetworkRequestKey,
  initialState,
  reducers: {
    ResourceNetworkRequestBegin: Resource => {
      Resource.isLoading = true;
    },

    ResourceNetworkRequestSuccess: (Resource, action) => {
      Resource.isLoading = false;
      Resource.data = action.payload;
      Resource.error = undefined;
    },

    ResourceNetworkRequestFailure: (Resource, action) => {
      Resource.isLoading = false;
      Resource.error = action.payload;
      Resource.data = undefined;
    },
    ResourceNetworkRequestClear: Resource => {
      Resource.isLoading = false;
      Resource.error = undefined;
      Resource.data = undefined;
    },
  },
});

export default slice.reducer;
export const {
  ResourceNetworkRequestBegin,
  ResourceNetworkRequestClear,
  ResourceNetworkRequestFailure,
  ResourceNetworkRequestSuccess } =
  slice.actions;
