// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import helloReducer from '../features/HelloWorld/HelloSlice';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
  },
});

// TypeScriptの型定義をエクスポートすることで、アプリケーション全体で使用できるようにします。
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
