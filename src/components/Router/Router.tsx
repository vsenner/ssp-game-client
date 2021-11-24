import React, {FC} from 'react';
import Login from "../Login/Login";
import Game from "../Game/Game";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";




const privateRoutes = [
  {path: '/game/:id' , component: Game, exact: true}
]

const publicRoutes = [
  {path: '/login' , component: Login, exact: true}
]

const Router:FC = () => {
  const {auth, room} = useSelector((state: RootState) => state.user)
  return (
    <Switch>
      {auth
        ? privateRoutes.map(route => <Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>)
        : publicRoutes.map(route => <Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>)
      }
      {auth
        ? <Redirect to={`/game/${room}`}/>
        : <Redirect to={'/login'}/>
      }
    </Switch>
  )
};

export default Router;