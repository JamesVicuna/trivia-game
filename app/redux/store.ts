import { configureStore } from '@reduxjs/toolkit'
import gameReducer from "./features/game/gameSlice";
import optionsReducer from "./features/options/optionsSlice"
import recordReducer from "./features/record/recordSlice"


export const store = configureStore({
  reducer: {
    game: gameReducer,
    options: optionsReducer,
    record: recordReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch