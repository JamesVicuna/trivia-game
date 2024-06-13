import { createAsyncThunk, createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { api } from "@/app/services/api";
import { SubmitGamePayload } from "../record/recordSlice";

export interface GameState {
  questions: TriviaQuestion[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  // userAnswers: (string|null)[];
  userAnswers: string[];
  submitted: boolean;
  inProgress: boolean;
}

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const initialState: GameState = {
  questions: [],
  status: "idle",
  error: null,
  userAnswers: [],
  submitted: false,
  inProgress: false,
};

interface FetchQuestionsPayload {
  results: TriviaQuestion[]
}


export const fetchQuestions = createAsyncThunk(
  "game/fetchQuestions",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const state: any = getState();
    const { amount, difficulty, type } = state.options;
    let response;
    try {
      response = await api.get(
        `?amount=${amount}&difficulty=${difficulty}&type=${type}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error.response)
      return rejectWithValue(error.response.message);
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
    submitGame: (state, action: PayloadAction<SubmitGamePayload>) => {
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
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<FetchQuestionsPayload>) => {
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
