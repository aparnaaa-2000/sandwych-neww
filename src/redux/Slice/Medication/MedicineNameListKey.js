import {createSlice} from '@reduxjs/toolkit';

export const MedicineNameListKey = 'MedicineNameList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined
};

const slice = createSlice({
  name: MedicineNameListKey,
  initialState,
  reducers: {
    MedicinelistBegin: Medicine => {
        Medicine.isLoading = true;
    },

    MedicinelistSuccess: (Medicine, action) => {
        Medicine.isLoading = false;
        Medicine.data = action.payload;
        Medicine.error = undefined;
    },

    MedicinelistFailure: (Medicine, action) => {
        Medicine.isLoading = false;
        Medicine.error = action.payload;
        Medicine.data = undefined;
    },

    MedicinelistClear: Medicine => {
        Medicine.isLoading = false;
        Medicine.error = undefined;
        Medicine.data = undefined;
    },
  },
});

export default slice.reducer;
export const {MedicinelistBegin,MedicinelistClear,MedicinelistFailure,MedicinelistSuccess} =
  slice.actions;
