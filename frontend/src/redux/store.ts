import { configureStore } from '@reduxjs/toolkit';
import useReducer from './userSlice';
import messageReducer from './messageSlice';

const store = configureStore({
  reducer: {
    user: useReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
