import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
    const navigate = useNavigate();

    const createRoom = async () => {
        const res = await fetch('http://localhost:8000/games/poker/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ numPlayers: 4 }),
        });

        const data = await res.json();
        navigate(`/lobby/${data.matchID}`);
    }

    return (
        <button
            onClick={createRoom}
            className="m-10 px-6 py-3 bg-rich-gold text-black font-semibold rounded-xl hover:bg-yellow-300 transiton duration-300 shadow-gold"
        >
            🎲 Create a room
        </button>
    )
}