import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {sendChoice} from "../../ws";

const Game:FC = () => {

  const {room,id} = useSelector((state:RootState) => state.user)

  const {me, enemy} = useSelector((state:RootState) => state.game)

  return (
    <div className={'game'}>
      Room: {room}
      <button onClick={() => sendChoice(id,room,'stone')}>Send Stone</button>
      <button onClick={() => sendChoice(id,room,'paper')}>Send Paper</button>
    </div>
  );
};

export default Game;