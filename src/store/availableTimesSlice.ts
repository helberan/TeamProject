import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AvailableTimes {
  times: string[];
}

const initialState: AvailableTimes = {
  times: [''],
};

const availableTimesSlice = createSlice({
  name: 'availableTimes',
  initialState,
  reducers: {
    setInitialState(state, action: PayloadAction<string[]>) {
      state.times = action.payload;
    },
    removeTime(state, action: PayloadAction<string>) {
      state.times = state.times.filter((time) => time !== action.payload);
    },
  },
});

export const { removeTime, setInitialState } = availableTimesSlice.actions;
export default availableTimesSlice.reducer;
