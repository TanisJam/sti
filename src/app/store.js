import { configureStore } from '@reduxjs/toolkit';
import heroSlice from '../features/heroes/heroSlice';

export const store = configureStore({
  reducer: {
    heroes: heroSlice,
  },
});
