import {store} from "../store/store";
import {v4} from "uuid";
import {setAuth, setUser} from "../store/reducer/user.reducer";
import {newGame, setData} from "../store/reducer/game.reducer";
export const ws = new WebSocket(`ws://localhost:5000/app/connect/`);

export const wsSend = function(data: string) {
// readyState - true, если есть подключение
  if(!ws.readyState){
    setTimeout(function (){
      wsSend(data);
    },100);
  } else {
    ws.send(data);
  }
};

export const createRoom = (username: string, id: string) => {
  const room_id = v4()
  wsSend(JSON.stringify({
    type: 'create',
    data: {
      room: room_id,
      username,
      user_id: id
    }
  }))
}


export const sendChoice = (id: string, room:string | undefined, choice:string = 'stone') => {
  store.dispatch(newGame())
  wsSend(JSON.stringify({
    type: 'choice',
    data: {
      user_id: id,
      room,
      choice
    }
  }))
}



export const connectToGame = (id: string, username:string, room:string | undefined) => {
  wsSend(JSON.stringify({
    type: 'connect',
    data: {
      user_id: id,
      username,
      room
    }
  }))
}

ws.onopen = function() {
  console.log('Connected')
};

ws.onclose = function(event) {
  console.log(event)
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};


ws.onerror = function(ev:Event) {
  console.log("Ошибка " + ev);
};

ws.onmessage = (ev) => {
  const data = JSON.parse(ev.data)

  switch (data.type){
    case 'connect': {
      if(data.status === 'success'){
        store.dispatch(setUser({username: data.username, id: data.user_id, room: data.room}))
        store.dispatch(setAuth(true))
      }
      break
    }
    case 'create': {
      if(data.status === 'success'){
        connectToGame(data.user_id, data.username, data.room)
      }
      break
    }
    case 'greeting': {
      console.log(data.message)
      break
    }
    case 'choice': {
      store.dispatch(setData({me: data.me, enemy: data.enemy}))
    }
  }

}