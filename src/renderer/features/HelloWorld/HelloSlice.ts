// src/features/HelloWorld/helloSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HelloState {
  message: string;
}

const initialState: HelloState = {
  message: 'Hello World',
};

export const helloSlice = createSlice({
  name: 'hello',
  initialState,
  reducers: {
    toggleMessage: (state) => {
      state.message = state.message === 'Hello World' ? 'GoodNight World' : 'Hello World';
    },
  },
});

export const { toggleMessage } = helloSlice.actions;

export default helloSlice.reducer;
