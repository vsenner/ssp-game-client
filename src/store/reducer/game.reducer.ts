import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Game {
  me: string,
  enemy: string
}


const initialState = {
  me: '',
  enemy: ''
}

const gameReducer = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    setData: (state, payload:PayloadAction<Game>) => {
      state = payload.payload
    },
    newGame: (state) => {
      state = {
        me:'',
        enemy:''
      }
    }
  }
})

export default gameReducer.reducer
export const {setData, newGame} = gameReducer.actions
