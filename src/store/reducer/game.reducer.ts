import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Game {
  me: string,
  enemy: string,
  choose?: boolean
}


const initialState:Game = {
  me: '',
  enemy: '',
  choose: false
}

const gameReducer = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    setData: (state, payload:PayloadAction<Game>) => {
      state.me = payload.payload.me
      state.enemy = payload.payload.enemy
    },
    newGame: (state) => {
      state.me = ''
      state.enemy = ''
    },
    setChoose: (state) => {
      state.choose = !state.choose
    },
  }
})

export default gameReducer.reducer
export const {setData, newGame, setChoose} = gameReducer.actions
