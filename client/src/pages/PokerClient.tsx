import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { PokerGame } from '../../../server/game'; // Импортируй только имя игры

// Интерфейс для пропсов
interface PokerClientProps {
  matchID: string;
  playerID: string;
  credentials: string;
}

const PokerBoard = (props: any) => {
  console.log('Board props', props);
  return (
    <div className="text-white ">
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

const BoardClient = Client({
  game: PokerGame,
  board: PokerBoard,
  multiplayer: SocketIO({ server: 'http://localhost:8000' }),
  debug: false,
});

// Обёртка для передачи нужных пропсов
export default function PokerClient(props: PokerClientProps) {
  // Передаём все пропсы, которые ждёт boardgame.io
  return <BoardClient {...props} />;
}