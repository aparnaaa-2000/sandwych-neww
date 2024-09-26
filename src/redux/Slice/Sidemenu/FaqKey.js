import {createSlice} from '@reduxjs/toolkit';

export const FaqSliceKey = 'FAQ';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: FaqSliceKey,
  initialState,
  reducers: {
    faqBegin: faq => {
        faq.isLoading = true;
    },

    faqSuccess: (faq, action) => {
        faq.isLoading = false;
        faq.data = action.payload;
        faq.error = undefined;
    },

    faqFailure: (faq, action) => {
        faq.isLoading = false;
        faq.error = action.payload;
        faq.data = undefined;
    },
    faqClear: faq => {
        faq.isLoading = false;
        faq.error = undefined;
        faq.data = undefined;
    },
  },
});

export default slice.reducer;
export const {faqSuccess, faqFailure, faqBegin, faqClear} =
  slice.actions;
