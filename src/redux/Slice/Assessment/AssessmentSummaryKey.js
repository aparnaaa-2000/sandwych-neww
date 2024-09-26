import {createSlice} from '@reduxjs/toolkit';

export const AssessmentSummaryKey = 'AssessmentSummary';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AssessmentSummaryKey,
  initialState,
  reducers: {
    AssessmentSummaryBegin: AssessmentSummary => {
        AssessmentSummary.isLoading = true;
    },

    AssessmentSummarySuccess: (AssessmentSummary, action) => {
        AssessmentSummary.isLoading = false;
        AssessmentSummary.data = action.payload;
        AssessmentSummary.error = undefined;
    },

    AssessmentSummaryFailure: (AssessmentSummary, action) => {
        AssessmentSummary.isLoading = false;
        AssessmentSummary.error = action.payload;
        AssessmentSummary.data = undefined;
    },

    AssessmentSummaryClear: AssessmentSummary => {
        AssessmentSummary.isLoading = false;
        AssessmentSummary.error = undefined;
        AssessmentSummary.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AssessmentSummarySuccess,AssessmentSummaryFailure,AssessmentSummaryBegin,AssessmentSummaryClear} =
  slice.actions;
