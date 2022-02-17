import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import userQuestionsSlice from './slices/userQuestionsSlice';
import tagDataSlice from './slices/tagDataSlice';

export const store = configureStore({
  reducer: {
    searchSlice,
    userQuestionsSlice,
    tagDataSlice,
  },
});
