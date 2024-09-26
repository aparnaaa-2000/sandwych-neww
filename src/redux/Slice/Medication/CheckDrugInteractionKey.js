import {createSlice} from '@reduxjs/toolkit';

export const CheckDrugInteractionKey = 'CheckDrugInteraction';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: CheckDrugInteractionKey,
  initialState,
  reducers: {
    CheckDrugInteractionBegin: DrugInteraction => {
        DrugInteraction.isLoading = true;
    },

    CheckDrugInteractionSuccess: (DrugInteraction, action) => {
        DrugInteraction.isLoading = false;
        DrugInteraction.data = action.payload;
        DrugInteraction.error = undefined;
    },

    CheckDrugInteractionFailure: (DrugInteraction, action) => {
        DrugInteraction.isLoading = false;
        DrugInteraction.error = action.payload;
        DrugInteraction.data = undefined;
    },

    CheckDrugInteractionClear: DrugInteraction => {
        DrugInteraction.isLoading = false;
        DrugInteraction.error = undefined;
        DrugInteraction.data = undefined;
    },
  },
});

export default slice.reducer;
export const { CheckDrugInteractionBegin, CheckDrugInteractionClear, CheckDrugInteractionFailure, CheckDrugInteractionSuccess} =
  slice.actions;
