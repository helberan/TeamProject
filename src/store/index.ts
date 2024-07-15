import { configureStore } from '@reduxjs/toolkit';
import availableTimesReducer from './availableTimesSlice';

const store = configureStore({
  reducer: {
    availableTimes: availableTimesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
