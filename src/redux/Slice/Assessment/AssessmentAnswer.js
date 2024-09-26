import {createSlice} from '@reduxjs/toolkit';

export const AssessmentAnsKey = 'AssessmentAnswer';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AssessmentAnsKey,
  initialState,
  reducers: {
    AssessmentAnsBegin: AssessmentAns => {
        AssessmentAns.isLoading = true;
    },

    AssessmentAnsSuccess: (AssessmentAns, action) => {
        AssessmentAns.isLoading = false;
        AssessmentAns.data = action.payload;
        AssessmentAns.error = undefined;
    },

    AssessmentAnsFailure: (AssessmentAns, action) => {
        AssessmentAns.isLoading = false;
        AssessmentAns.error = action.payload;
        AssessmentAns.data = undefined;
    },

    AssessmentAnsClear: AssessmentAns => {
        AssessmentAns.isLoading = false;
        AssessmentAns.error = undefined;
        AssessmentAns.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AssessmentAnsSuccess,AssessmentAnsFailure,AssessmentAnsBegin,AssessmentAnsClear} =
  slice.actions;
