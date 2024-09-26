import {createSlice} from '@reduxjs/toolkit';

export const PrivacyPolicySliceKey = 'PrivacyPolicy';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PrivacyPolicySliceKey,
  initialState,
  reducers: {
    PrivacyPolicyBegin: PrivacyPolicy => {
        PrivacyPolicy.isLoading = true;
    },

    PrivacyPolicySuccess: (PrivacyPolicy, action) => {
        PrivacyPolicy.isLoading = false;
        PrivacyPolicy.data = action.payload;
        PrivacyPolicy.error = undefined;
    },

    PrivacyPolicyFailure: (PrivacyPolicy, action) => {
        PrivacyPolicy.isLoading = false;
        PrivacyPolicy.error = action.payload;
        PrivacyPolicy.data = undefined;
    },
    PrivacyPolicyClear: PrivacyPolicy => {
        PrivacyPolicy.isLoading = false;
        PrivacyPolicy.error = undefined;
        PrivacyPolicy.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PrivacyPolicyBegin,PrivacyPolicyClear,PrivacyPolicyFailure,PrivacyPolicySuccess} =
  slice.actions;
