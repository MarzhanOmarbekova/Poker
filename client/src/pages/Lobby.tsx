import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PokerClient from './PokerClient';

export default function Lobby() {
  const { id: matchID } = useParams();
  const navigate = useNavigate();
  const playerName = localStorage.getItem("playerName");
  const [playerID, setPlayerID] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [players, setPlayers] = useState<any[]>([]);

  

  useEffect(() => {
    if(!playerName) {
        alert("Please go to the home page and enter your name.");
        navigate("/");
        return;
    }
  
    const joinMatch = async () => {
        try {
            const res = await fetch(`http://localhost:8000/games/poker/${matchID}`);
            const data = await res.json();
            const availablePlayer = data.players.find((p: any) => !p.name);
            if (!availablePlayer) {
                alert("The room is full!");
                return;
            }

            const joinRes = await fetch(`http://localhost:8000/games/poker/${matchID}/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                playerID: availablePlayer.id,
                playerName: playerName,
                }),
            });

            const joinData = await joinRes.json();
            console.log('Join successful:', joinData);
            setPlayerID(availablePlayer.id);
            setCredentials(joinData.playerCredentials);
        } catch (e) {
            console.error('Join match error:', e);
        }
    };

    joinMatch();
}, [matchID, playerName, navigate]);

useEffect(() => {
    const fetchPlayers = async () => {
        const res = await fetch(`http://localhost:8000/games/poker/${matchID}`);
        const data = await res.json();
        setPlayers(data.players);
    }
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 2000);
    return () => clearInterval(interval);
}, [matchID]);

  if (!playerID || !credentials) {
    return <div className="text-black p-4">Joining the room...</div>;
  }

  return (
    <div className="min-h-screen bg-luxury bg-cover bg-center p-10 text-rich-gold font-serif">
      <div className="flex flex-col items-center text-center pb-10">
        <h1 className="text-4xl mb-8 drop-shadow-gold">Welcome to the Lobby</h1>
        <p>Room ID: <span className="font-mono">{matchID}</span></p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        {players.map((player, index) => (
            <div
            key={index}
            className={`rounded-xl border-2 p-4 text-center shadow-gold ${
                player.playerName ? 'border-gold bg-velv text-yellow-300' : 'border-gray-400 text-gray-400 bg-black/30'
            }`}
            >
            <p className="text-lg font-bold">
                {player.playerName || `Waiting for Player ${index}`}
            </p>
            <p className="text-sm">{player.playerName ? 'Ready' : 'Waiting...'}</p>
            </div>
        ))}
        </div>

      <PokerClient matchID={matchID} playerID={playerID} credentials={credentials} />
        
        {playerID === "0" && (
            <button
                onClick={() => {
                // Пока просто reload страницы или лог
                console.log("Game started!");
                }}
                className="px-6 py-3 bg-gold text-black rounded-xl shadow-lg hover:bg-yellow-300 transition"
            >
                🚀 Start Game
            </button>
            )}

    </div>
  );
}
