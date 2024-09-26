import {createSlice} from '@reduxjs/toolkit';

export const AssessmentQuestKey = 'AssessmentQuest';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: AssessmentQuestKey,
  initialState,
  reducers: {
    AssessmentQuestBegin: AssessmentQuest => {
        AssessmentQuest.isLoading = true;
    },

    AssessmentQuestSuccess: (AssessmentQuest, action) => {
        AssessmentQuest.isLoading = false;
        AssessmentQuest.data = action.payload;
        AssessmentQuest.error = undefined;
    },

    AssessmentQuestFailure: (AssessmentQuest, action) => {
        AssessmentQuest.isLoading = false;
        AssessmentQuest.error = action.payload;
        AssessmentQuest.data = undefined;
    },

    AssessmentQuestClear: AssessmentQuest => {
        AssessmentQuest.isLoading = false;
        AssessmentQuest.error = undefined;
        AssessmentQuest.data = undefined;
    },
  },
});

export default slice.reducer;
export const {AssessmentQuestSuccess,AssessmentQuestFailure,AssessmentQuestBegin,AssessmentQuestClear} =
  slice.actions;
