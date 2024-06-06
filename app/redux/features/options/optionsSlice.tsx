import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OptionsState {
    amount: number;
    difficulty: 'easy' | 'medium' | 'hard';
    type: string;
}

const initialState: OptionsState = {
  amount: 10,
  difficulty: "medium",
  type: "multiple",
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    saveOptions: (_, action: PayloadAction<OptionsState>) => {
      return action.payload;
    },
  },
});

export const { saveOptions } = optionsSlice.actions;

export default optionsSlice.reducer;