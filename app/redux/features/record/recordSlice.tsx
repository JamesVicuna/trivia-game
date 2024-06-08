import {
  PayloadAction,
  createSlice,
  nanoid,
  createAction,
} from "@reduxjs/toolkit";

interface RecordState {
  history: Game[];
}

export interface SubmitGamePayload {
  userAnswers: (string | null)[];
  questions: { correct_answer: string }[];
  time: number;
}

interface Game {
  userAnswers: (string | null)[];
  questions: object[];
  time: number;
  score: number;
  id: string;
}

const initialState: RecordState = {
  history: [],
};

const submitGame = createAction<SubmitGamePayload>("game/submitGame");

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    deleteGame: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(
        (game: Game) => game.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      submitGame,
      (state, action: PayloadAction<SubmitGamePayload>) => {
        const { userAnswers, questions, time } = action.payload;
        const score = Math.floor(
          (userAnswers.filter(
            (userAnswer, i: number) =>
              userAnswer === questions[i].correct_answer,
          ).length /
            questions.length) *
            100,
        );
        const game: Game = {
          userAnswers,
          questions,
          time,
          score,
          id: nanoid(),
        };
        state.history.push(game);
      },
    );
  },
});

export const { deleteGame } = recordSlice.actions;

export default recordSlice.reducer;
