import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface User {
  id: string,
  room?: string,
  username: string,
  auth?: boolean
}

export const initialState:User = {
  id: '',
  room: '',
  username: '',
  auth: false
}


const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state,action:PayloadAction<User>) => {
      state.username = action.payload.username
      state.id = action.payload.id
      state.room = action.payload.room
    },

    setRoom: (state, action:PayloadAction<string>) => {
      state.room = action.payload
    },

    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload
    },
    getUser: (state) => {
      return state
    }
  }

})


export const {setUser,setRoom, setAuth,getUser} = userSlice.actions

export default userSlice.reducer