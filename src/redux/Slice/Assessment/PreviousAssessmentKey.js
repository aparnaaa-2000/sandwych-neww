import {createSlice} from '@reduxjs/toolkit';

export const PreviousAssessmentKey = 'PreviousAssessment';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: PreviousAssessmentKey,
  initialState,
  reducers: {
    PreviousAssessmentBegin: Assessment => {
        Assessment.isLoading = true;
    },

    PreviousAssessmentSuccess: (Assessment, action) => {
        Assessment.isLoading = false;
        Assessment.data = action.payload;
        Assessment.error = undefined;
    },

    PreviousAssessmentFailure: (Assessment, action) => {
        Assessment.isLoading = false;
        Assessment.error = action.payload;
        Assessment.data = undefined;
    },

    PreviousAssessmentClear: Assessment => {
        Assessment.isLoading = false;
        Assessment.error = undefined;
        Assessment.data = undefined;
    },
  },
});

export default slice.reducer;
export const {PreviousAssessmentBegin,PreviousAssessmentClear,PreviousAssessmentSuccess,PreviousAssessmentFailure} =
  slice.actions;
