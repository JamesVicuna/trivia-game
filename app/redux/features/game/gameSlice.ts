import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/app/services/api";

// Define a type for the slice state
export interface GameState {
  questions: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  userAnswers: string[];
  submitted: boolean;
  inProgress: boolean;
}

// Define the initial state using that type
const initialState: GameState = {
  questions: [],
  status: "idle",
  error: null,
  userAnswers: [],
  submitted: false,
  inProgress: false,
};

export const fetchQuestions = createAsyncThunk(
  "game/fetchQuestions",
  async (_, { dispatch, getState }) => {
    const state: any = getState();
    // const { amount, difficulty, type } = state.options;
    let response;
    try {
      response = await api.get(
        // `?amount=${10}&difficulty=${difficulty}&type=${type}`,
        `?amount=${10}`,
      );
      return response.data;
    } catch (error: any) {
      if (error.response.status === 429) {
        setTimeout(() => {
          dispatch(fetchQuestions());
        }, 2000);
      }
      return error.response;
    }
  },
);

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAnswerChoice: (
      state,
      action: PayloadAction<{ answer: string; index: number }>,
    ) => {
      const { answer, index } = action.payload;
      state.userAnswers[index] = answer;
    },
    submitGame: (state) => {
      state.submitted = true;
      state.inProgress = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
        state.inProgress = false;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload.results;
        state.inProgress = true;
        state.userAnswers = Array(action.payload.results.length).fill(null);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addAnswerChoice, submitGame } = gameSlice.actions;

export default gameSlice.reducer;
