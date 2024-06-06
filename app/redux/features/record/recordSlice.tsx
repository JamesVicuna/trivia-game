import { PayloadAction, createSlice, nanoid, createAction } from "@reduxjs/toolkit";

export interface RecordState {
  history: [];
}

interface SubmitGamePayload {
    userAnswers: string[];
    questions: string[];
    time: number;
  }

const initialState = {
  history: [],
};

const submitGame = createAction<SubmitGamePayload>("game/submitGame");
const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    deleteGame: (state, action: PayloadAction<number>) => {
      state.history = state.history.filter(
        (game: { id: number }) => game.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitGame, (state, action) => {
      const { userAnswers, questions, time } = action.payload;
      const score = Math.floor(
        (userAnswers.filter(
          (userAnswer: string, i: number) =>
            userAnswer === questions[i].correct_answer,
        ).length /
          questions.length) *
          100,
      );
      const game = {
        userAnswers,
        questions,
        time,
        score,
        id: nanoid(),
      };
      state.history.push(game);
    });
  },
});

export const { deleteGame } = recordSlice.actions;

export default recordSlice.reducer;
