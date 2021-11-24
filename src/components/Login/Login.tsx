import React, {FC, useState} from 'react';
import {v4} from "uuid";
import {connectToGame, createRoom} from "../../ws";

const Login: FC = () => {
  const [login, setLogin] = useState<boolean>(false)
  const [room, setRoom] = useState<string>('')
  const [status, setStatus] = useState<boolean>(true)
  const [username, setUsername] = useState<string>('')

  const id = v4()

  return status ?
    <div className="login-control">
      <button className={'btn login-btn'} onClick={() => {
        setLogin(true)
        setStatus(false)
      }
      }>Login To Game
      </button>
      <button className={'btn create-btn'} onClick={() => {
        setLogin(false)
        setStatus(false)
      }
      }>Create Game
      </button>
    </div>
    : login
      ?
      <div className={'login'}>
        <input
          type="text"
          placeholder={'Enter Username'}
          value={username}
          onChange={(e) => setUsername ? setUsername(e.target.value) : null}
        />
        <input
          type="text"
          placeholder={'Enter GameID'}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <div className="login-control">
          <button className={'btn submit-btn'} onClick={() => {
            if (username.length > 1) {
              connectToGame(id, username, room)
            }
          }
          }>Connect
          </button>
        </div>

      </div>
      :
      <div className={'login'}>
        <input
          type="text"
          placeholder={'Enter Username'}
          value={username}
          onChange={(e) => setUsername ? setUsername(e.target.value) : null}
        />
        <button className={'btn create-btn'} onClick={() => {
          if (username.length > 1) {
            createRoom(username, id)
          }
        }
        }>Connect
        </button>
      </div>
};

export default Login;