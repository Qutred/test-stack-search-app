import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import searchBySlice from './slices/searchBySlice';

export const store = configureStore({
  reducer: {
    searchSlice,
    searchBySlice,
  },
});
