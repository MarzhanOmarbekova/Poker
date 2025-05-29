// import { Game } from 'boardgame.io';

// interface G {
//     players: Record<string, {hand: string[]; chips: number; bet: number}>;
//     pot: number;
//     currentPlayer: string;
// }

// export const PokerGame: Game<G> = {
//     name: 'poker',

//     setup: (ctx) => {
//         const players: any = {};
//         for (let i = 0; i < ctx.numPlayers; i++){
//             players[i] = {hand: [], chips: 1000, bet: 0};
//         }
//         return {
//             players,
//             pot: 0,
//             currentPlayer: '0',
//         }
//     },

//     moves: {
//         fold: (G, ctx) => {
//             ctx.events?.endTurn();
//         },

//         check: (G, ctx) => {
//             ctx.events?.endTurn();
//         },
        
//         call: (G, ctx) => {
//             ctx.events?.endTurn();
//         }

//         raise: (G, ctx, amount: number) => {
//             G.players[ctx.currentPlayer].bet += amount;
//             G.pot += amount;
//             ctx.events?.endTurn();
//         }

//         turn: {
//             order: {
//                 first: () => 0,
//                 next: (G, ctx) => (parseInt(ctx.currentPlayer) + 1) % ctx.numPlayers,
//             },
//         },
//         // addPlayer({ G, ctx }, name: string ) {
//         //     const id = ctx.currentPlayer ?? 'unknown';
//         //     if(!G.players.find(p => p.id === id)){
//         //         G.players.push({ id, name });
//         //     }
//         // },
//         // startGame(G) {
//         //     G.started = true
//         // }
//         endIf:(G, ctx) => {

//         }
//     }
// }


import { Game } from 'boardgame.io';

interface Player {
  id: string;
  name?: string;
  chips: number;
  bet: number;
  hand: string[];
  folded: boolean;
}

interface PokerGameState {
  players: Player[];
  pot: number;
  currentPlayerIndex: number;
}

export const PokerGame: Game<PokerGameState> = {
  name: 'poker',

  setup: (ctx) => {
    const numPlayers = typeof ctx.numPlayers === 'number' ? ctx.numPlayers : 2;

    const players: Player[] = Array.from({ length: numPlayers }, (_, i) => ({
      id: i.toString(),
      chips: 1000,
      bet: 0,
      hand: [],
      folded: false,
    }));

    return {
      players,
      pot: 0,
      currentPlayerIndex: 0,
    };
  },

  moves: {
    fold({G, ctx}) {
      const player = G.players[parseInt(ctx.currentPlayer)];
      player.folded = true;
    },
    bet({G, ctx}, amount: number) {
      const player = G.players[parseInt(ctx.currentPlayer)];
      if (player.chips >= amount) {
        player.chips -= amount;
        player.bet += amount;
        G.pot += amount;
      }
    },
  },
};
