import {createSlice} from '@reduxjs/toolkit';

export const StoreDrugInteractionKey = 'StoreDrugInteraction';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: StoreDrugInteractionKey,
  initialState,
  reducers: {
    StoreDrugInteractionBegin: DrugInteraction => {
        DrugInteraction.isLoading = true;
    },

    StoreDrugInteractionSuccess: (DrugInteraction, action) => {
        DrugInteraction.isLoading = false;
        DrugInteraction.data = action.payload;
        DrugInteraction.error = undefined;
    },

    StoreDrugInteractionFailure: (DrugInteraction, action) => {
        DrugInteraction.isLoading = false;
        DrugInteraction.error = action.payload;
        DrugInteraction.data = undefined;
    },

    StoreDrugInteractionClear: DrugInteraction => {
        DrugInteraction.isLoading = false;
        DrugInteraction.error = undefined;
        DrugInteraction.data = undefined;
    },
  },
});

export default slice.reducer;
export const { StoreDrugInteractionBegin, StoreDrugInteractionClear, StoreDrugInteractionFailure, StoreDrugInteractionSuccess} =
  slice.actions;
