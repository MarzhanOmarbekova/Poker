import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokerClient from "./PokerClient";
import { LobbyClient } from "boardgame.io/client";

const lobbyClient = new LobbyClient({ server: "http://localhost:8000" });

export default function GamePage() {
  const { id: matchID } = useParams();
  const playerName = localStorage.getItem("playerName") || "";
  const [playerID, setPlayerID] = useState<string | undefined>(undefined);
  const [credentials, setCredentials] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchPlayer() {
      if (!matchID || !playerName) return;
      try {
        const match = await lobbyClient.getMatch("poker", matchID);
        const idx = match.players.findIndex((p) => p.name === playerName);
        if (idx !== -1) {
          setPlayerID(String(idx));
          const cred = localStorage.getItem(`poker_${matchID}_credentials_${idx}`);
          if (cred) {
            setCredentials(cred);
          } else {
            setCredentials(undefined);
          }
        }
      } catch (err) {
        // Можно добавить вывод ошибки
        setPlayerID(undefined);
        setCredentials(undefined);
      }
    }
    fetchPlayer();
  }, [matchID, playerName]);

  
  // Для отладки:
  console.log({ matchID, playerID, credentials });
  if (!playerID || !credentials || !matchID) {
  return <div className="text-white">Загрузка... (Вы должны войти через лобби)</div>;
}

  return (
    <div className="min-h-screen bg-cover bg-center  bg-table">
      <div style={{ color: "red" }}>
        PokerClient mount test: matchID = {matchID}, playerID = {playerID}, credentials={credentials}
      </div>
      <PokerClient matchID={matchID} playerID={playerID} credentials={credentials} />
    </div>
  );
}