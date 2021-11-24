import {configureStore} from "@reduxjs/toolkit";
import UserReducer from './reducer/user.reducer'
import GameReducer from './reducer/game.reducer'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    game: GameReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
