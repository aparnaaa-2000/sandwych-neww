import {createSlice} from '@reduxjs/toolkit';

export const AssessmentSaveKey = 'AssessmentSave';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name:AssessmentSaveKey,
  initialState,
  reducers: {
    AssessmentSaveBegin: Assessment => {
        Assessment.isLoading = true;
    },

    AssessmentSaveSuccess: (Assessment, action) => {
        Assessment.isLoading = false;
        Assessment.data = action.payload;
        Assessment.error = undefined;
    },

    AssessmentSaveFailure: (Assessment, action) => {
        Assessment.isLoading = false;
        Assessment.error = action.payload;
        Assessment.data = undefined;
    },

    AssessmentSaveClear: Assessment => {
        Assessment.isLoading = false;
        Assessment.error = undefined;
        Assessment.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AssessmentSaveBegin,AssessmentSaveClear,AssessmentSaveFailure,AssessmentSaveSuccess} =
  slice.actions;
