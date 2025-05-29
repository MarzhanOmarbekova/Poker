import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { PokerGame } from '../../../server/game'; // если ты копируешь на клиент, перенеси модель или импортируй только имя игры

const PokerBoard = (props: any) => {
  return (
    <div className="text-white">
      <p>You are Player {props.playerID}</p>
      <p>Pot: {props.G.pot}</p>
      <div>
        <button onClick={() => props.moves.fold()}>Fold</button>
        <button onClick={() => props.moves.check()}>Check</button>
        <button onClick={() => props.moves.call()}>Call</button>
        <button onClick={() => props.moves.raise(100)}>Raise</button>
      </div>
    </div>
  );
};

const PokerClient = Client({
  game: PokerGame,
  board: PokerBoard,
  multiplayer: SocketIO({ server: 'http://localhost:8000' }),
  debug: false,
});

export default PokerClient;
