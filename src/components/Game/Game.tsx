import React, {FC, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {clearState, sendChoice} from "../../ws";

const Game:FC = () => {

  const {room,id} = useSelector((state:RootState) => state.user)

  const {me, enemy, choose} = useSelector((state:RootState) => state.game)

  const whoWon = () => {
    if (me !== '' && enemy !== '') {
      if (me === enemy) return <div> TIE </div>
      if (me === 'stone') {
        if (enemy === 'paper') return <div> LOSE </div>
        if (enemy === 'scissors') return <div> WIN </div>
      }
      if (me === 'paper') {
        if (enemy === 'scissors') return <div> LOSE </div>
        if (enemy === 'stone') return <div> WIN </div>
      }
      if (me === 'scissors') {
        if (enemy === 'stone') return <div> LOSE </div>
        if (enemy === 'paper') return <div> WIN </div>
      }
    }
  }



  useEffect(() => {
    console.log('ENEMY - ', enemy)
    console.log('ME - ', me)
  },[me, enemy])

  return (
    <div className={'game'}>
      Room: {room}

      {enemy !== '' && me !== ''
      ? <div>
          {whoWon()}
          <button onClick={clearState}>Try again</button>
        </div>
      : choose ?
          <div>Wait choose enemy</div>
          :
          <div className={'control'}>
            <button onClick={() => sendChoice(id,room,'stone')}>Send Stone</button>
            <button onClick={() => sendChoice(id,room,'paper')}>Send Paper</button>
            <button onClick={() => sendChoice(id,room,'scissors')}>Send Scissors</button>
          </div>
      }
    </div>
  );
};

export default Game;