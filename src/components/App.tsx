import React, {createContext, FC, useEffect} from 'react';
import Router from "./Router/Router";
import {BrowserRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";


interface User {
  id: string
  auth: boolean
  username: string
  setAuth: (x:boolean) => void,
  setUsername?: (x:string) => void
  room: string,
  setRoom: (x:string) => void
}


export const AuthContext = createContext<User>({
  id: '',
  auth: false,
  username: '',
  setAuth: (x) => {},
  setUsername: (x) => {},
  room: '',
  setRoom: (x) => {}
})




const App:FC = () => {

  const auth = useSelector((state: RootState) => state.user.auth)


  useEffect(() => {
    console.log('Auth - ' ,auth)
  },[auth])

  return (
      <div className={'app'}>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </div>
  );
};

export default App;