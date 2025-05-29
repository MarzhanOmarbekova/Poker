// import { useState } from 'react';
// import JoinRoom from './JoinRoom';

// export default function Board({ G, ctx, moves, playerID, matchID }) {
//     const [joined, setJoined] = useState(false);

//     const handleJoin = ( name: string ) => {
//         setJoined(true);
//         moves.addPlayer(name);
//         new Audio('/join.mp3').play.catch(() => {});
//     }

//     if(!joined){
//         return (
//             <JoinRoom
//                 playerID={playerID}
//                 matchID={matchID}
//                 moves={moves}
//                 onJoin={handleJoin}
//             />
//         )
//     }
//     // return (
//     //     <div className="text-white">
//     //         <h2>Poker Board</h2>
//     //         <pre>{JSON.stringify(G, null, 2)}</pre>
//     //     </div>
//     // )
//     return (
//         <div className='text-white p-4'>
//             <h2 className='text-xl text-gold mb-4'>Players in Room</h2>
//             <ul className='list-disc pl-5'>
//                 {G.players.map((p: any) => (
//                     <li key={p.id}>{p.name}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }