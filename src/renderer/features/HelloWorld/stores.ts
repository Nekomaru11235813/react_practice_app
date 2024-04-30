// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import helloReducer from './HelloSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
  },
});
