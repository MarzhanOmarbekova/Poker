import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LobbyClient } from 'boardgame.io/client';

const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' });


export default function Lobby() {
  const { id: matchID } = useParams();
  const navigate = useNavigate();
  const playerName = localStorage.getItem("playerName") || "";

  const [playerID, setPlayerID] = useState<string | null>(null);
  const [players, setPlayers] = useState< {name?: string, data?: any}[]>([]);
  const [joined, setJoined] = useState(false);
  const [credentials, setCredentials] = useState<string>("");

  useEffect(() => {
    if (!playerName) {
      alert("Go to home and enter your name!");
      navigate("/");
      return;
    }

    if(!matchID) return;


     async function join() {
      const match = await lobbyClient.getMatch('poker', matchID!);
      let idx = match.players.findIndex(p => p.name === playerName);
      
      let alreadyJoined = idx !== -1

      if (idx === -1) {
        idx = match.players.findIndex(p => !p.name);
      } 
      if (idx === -1) {
        alert('Room is full!');
        return;
      }
      setPlayerID(String(idx));

    // Пробуем credentials из localStorage
    const storedCreds = localStorage.getItem(`poker_${matchID}_credentials_${idx}`);
    if (alreadyJoined && storedCreds) {
      setCredentials(storedCreds);
      setJoined(true);
      return;
    }
      if (!alreadyJoined) {
        const joinRes = await lobbyClient.joinMatch('poker', matchID!, {
          playerID: String(idx),
          playerName,
        });
        setCredentials(joinRes.playerCredentials);
        localStorage.setItem(`poker_${matchID}_credentials_${idx}`, joinRes.playerCredentials);
        setJoined(true);
    } else {
      // Игрок уже в матче, но credentials нет (например, с другого браузера)
      alert('You are already in the room. Try another name or clear your storage.');
    }
  }

    join();
  }, [matchID, playerName, navigate]);

  useEffect(() => {
    if (!matchID) return;
    let mounted = true;

    async function updatePlayers() {
      const match = await lobbyClient.getMatch('poker', matchID!);
      if (mounted) setPlayers(match.players);
    }

    updatePlayers();

    const int = setInterval(updatePlayers, 500);

    return () => {
      mounted = false;
      clearInterval(int);
    };
  }, [matchID, joined]);

  const setReady = async () => {
    await lobbyClient.updatePlayer('poker', matchID!, {
      playerID: playerID!,
      credentials,
      newName: playerName,
      data: {ready: true}
    });
  };

  const allReady = players.filter(p => p.name).length > 1 && players.filter(p => p.name).every(p => p.data?.ready);;

  if (!playerID ) {
    return <div className="text-black p-4">Joining the room...</div>;
  }

  return (
    <div className="min-h-screen bg-luxury bg-cover bg-center p-10 text-rich-gold font-serif">
      <div className="flex flex-col items-center text-center pb-10">
        <h1 className="text-4xl mb-8 drop-shadow-gold">Welcome to the Lobby</h1>
        <p>Room ID: <span className="font-mono">{matchID}</span></p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        {players.filter(p => p.name).map((player, index) => (
            <div
            key={index}
            className={`rounded-xl bg-velv border-2 p-4 text-center shadow-gold ${
                player.name ? 'border-gold bg-velv text-yellow-300' : 'border-gray-400 text-gray-400 bg-black/30'
            }`}
            >
            <p className="text-lg font-bold">
                {player.name || `Waiting for Player ${index}`}
            </p>
            <p className="text-sm">
              {player.data?.ready ? 'Ready' : 'Not Ready'}
            </p>
            {player.name === playerName && !player.data?.ready &&
              <button className='border-2' onClick={setReady}>I'm Ready</button>
            }

            </div>
        ))}
        </div>
        
      {playerID === "0" && !allReady && (
        <button
        onClick={() => {
          window.location.href = `/game/${matchID}`;
        }}
        className=" px-6 py-3 bg-gold text-black rounded-xl shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled>
          🚀 Start Game
      </button>
      )}

      {playerID === "0" && allReady && (
        <button
          className="px-6 py-3 bg-gold text-black rounded-xl shadow-lg hover:bg-yellow-300 transition"
          onClick={async () => {
            new Audio ('/open.flac').play().catch(() => {});
            navigate(`/game/${matchID}`);
          }}
        >
          🚀 Start Game
        </button>
      )}

    </div>
  );
}
