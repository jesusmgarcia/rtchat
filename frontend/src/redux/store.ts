import { configureStore } from '@reduxjs/toolkit';
import useReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: useReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
