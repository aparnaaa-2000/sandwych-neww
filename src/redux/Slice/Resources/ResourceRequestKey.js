import {createSlice} from '@reduxjs/toolkit';

export const ResourceRequestKey = 'ResourceRequest';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ResourceRequestKey,
  initialState,
  reducers: {
    ResourceRequestBegin: Resource => {
        Resource.isLoading = true;
    },

    ResourceRequestSuccess: (Resource, action) => {
        Resource.isLoading = false;
        Resource.data = action.payload;
        Resource.error = undefined;
    },

    ResourceRequestFailure: (Resource, action) => {
        Resource.isLoading = false;
        Resource.error = action.payload;
        Resource.data = undefined;
    },
    ResourceRequestClear: Resource => {
        Resource.isLoading = false;
        Resource.error = undefined;
        Resource.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ResourceRequestBegin,ResourceRequestClear,ResourceRequestFailure,ResourceRequestSuccess} =
  slice.actions;
