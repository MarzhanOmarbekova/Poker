import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinRoom() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!roomId) return;
    navigate(`/lobby/${roomId}`);
    new Audio ('/join.flac').play().catch(() => {});
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen text-gold">
      <h2 className="text-5xl mb-6 font-semibold">Join a Room</h2>
      <input
        className="mb-4 p-2 rounded text-black border-2"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-rich-gold text-black rounded-xl hover:bg-yellow-300"
        onClick={handleSubmit}
      >
        JOIN
      </button>
    </div>
  );
}
