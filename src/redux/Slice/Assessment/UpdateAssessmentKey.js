import {createSlice} from '@reduxjs/toolkit';

export const UpdateAssessmentKey = 'UpdateAssessment';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,

};

const slice = createSlice({
  name: UpdateAssessmentKey,
  initialState,
  reducers: {
    UpdateAssessmentBegin: Assessment => {
        Assessment.isLoading = true;
    },

    UpdateAssessmentSuccess: (Assessment, action) => {
        Assessment.isLoading = false;
        Assessment.data = action.payload;
        Assessment.error = undefined;
    },

    UpdateAssessmentFailure: (Assessment, action) => {
        Assessment.isLoading = false;
        Assessment.error = action.payload;
        Assessment.data = undefined;
    },

    UpdateAssessmentClear: Assessment => {
        Assessment.isLoading = false;
        Assessment.error = undefined;
        Assessment.data = undefined;
    },
  },
});

export default slice.reducer;
export const {UpdateAssessmentBegin,UpdateAssessmentClear,UpdateAssessmentSuccess,UpdateAssessmentFailure} =
  slice.actions;
