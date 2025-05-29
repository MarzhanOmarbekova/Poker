export default function Rules() {
    return (
        <div className="min-h-screen bg-mainbg bg-cover flex flex-col items-center justify-center">
            <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Poker Game Rules</h2>
            <p className="text-gray-300 mb-2">
                This version uses classic Texas Hold'em:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Each player is dealt 2 cards.</li>
                <li>5 cards are dealt on the table (flop, turn, river).</li>
                <li>Players calls , fold or raise.</li>
                <li>The best combination of 5 cards wins.</li>
            </ul>
        </div>
        </div>
        
    )
}