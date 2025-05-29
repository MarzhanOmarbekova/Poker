import { Server, Origins } from 'boardgame.io/server';
import { PokerGame } from './game';

const server = Server({
    games:[PokerGame],
    origins: [
        'http://localhost:3000',
        'http://localhost:5173',
        '*'
    ],
    
});

server.run(8000, () => {
    console.log('Server running on http://localhost:8000');
});