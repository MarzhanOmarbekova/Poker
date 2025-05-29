import { Link } from "react-router-dom"

export default function Navbar(){
    return (
        <nav className="p-4 flex justify-between items-center bg-rich-dark bg-opacity-60 backdrop-blur-md shadow-md">
            <h1 className="text-2xl font-bold text-shiny-gold">♠ Poker Royale</h1>
            <div className="space-x-6">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/rules" className="hover:underline">Rules</Link>
            </div>
        </nav>
    )
}