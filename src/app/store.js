import { configureStore } from '@reduxjs/toolkit';
import searhReducer from '../features/search/searchSlide';

export const store = configureStore({
  reducer: {
    search: searhReducer
  },
});
