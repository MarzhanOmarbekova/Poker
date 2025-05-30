import { useNavigate } from "react-router-dom"
import CreateRoom from "./CreateRoom"
import { useEffect, useState } from "react"

export default function Home(){
    const navigate = useNavigate()
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("playerName");
        if(storedName) {
            setPlayerName(storedName);
        } else {
            askForName();
        }
    }, []);

    const askForName = () => {
        new Audio ('/dialog(pop-up).flac').play().catch(() => {});
        const name = prompt("Enter your name:");
        if (name && name.trim().length > 0) {
            localStorage.setItem("playerName", name);
            setPlayerName(name);
        }
    }

    const handleJoinRoom = () => {
        navigate('/join');
    }

    return (
        <div className="min-h-screen bg-mainbg bg-cover bg-center flex flex-col items-center justify-center h-[80vh] text-gold">
            <h1 className="text-5xl  font-bold drop-shadow-gold">Welcome to Poker Royale</h1>
            <p className="text-2xl mt-6 font-semibold">Start playing with friends right now</p>
            
            <div className="mt-6 text-xl">
                👤 Player: <span className="font-bold mr-5">{playerName}</span>
                <button
                    onClick={askForName}
                    className="ml-6 p-2 text-gold hover:text-yellow-200 border border-yellow-400 rounded-xl"
                >
                    ✏ Change Name
                </button>
            </div>
            
            <div className="space-x-4">
                <CreateRoom></CreateRoom>
                <button
                    onClick={handleJoinRoom}
                    className="m-10 px-6 py-3 border border-yellow-400 text-shiny-gold  font-semibold rounded-xl hover:bg-yellow-300 transition duration-300 shadow-gold"
                >
                    🤝 Join the room
                </button>
            </div>
        </div>
    )
}