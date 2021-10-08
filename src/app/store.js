import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../features/cities/citySlice';
import preferenceReducer from '../features/preferences/preferenceSlice';

export const store = configureStore({
  reducer: {
    city: cityReducer,
    preference: preferenceReducer,
  },
});
