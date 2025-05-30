import { Game, Ctx } from 'boardgame.io';

export interface Player {
  id: string;
  name?: string;
  chips: number;
  bet: number;
  hand: string[];
  folded: boolean;
}

export interface PokerGameState {
  players: Player[];
  pot: number;
  currentPlayer: string;
  phase: 'lobby' | 'playing' | 'showdown';
  deck: string[];
  community: string[];
}

function getShuffledDeck(): string[] {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = suits.flatMap(suit => ranks.map(rank => rank + suit));

  for(let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export const PokerGame: Game<PokerGameState> = {
  name: 'poker',

  setup: ({ctx}): PokerGameState => {
    const numPlayers = ctx.numPlayers || 2;
    const deck = getShuffledDeck();

    const players: Player[] = Array.from({ length: numPlayers }, (_, i) => ({
      id: i.toString(),
      chips: 1000,
      bet: 0,
      hand: [],
      folded: false,
      name: ctx.playOrder[i],
    }));

    players.forEach(p => {
      p.hand = [deck.pop()!, deck.pop()!]
    })

    return {
      players,
      pot: 0,
      currentPlayer: '0',
      phase: 'playing',
      deck,
      community: [],
    };
  },

  moves: {
    fold({G, ctx}) {
      const player = G.players[parseInt(ctx.currentPlayer)];
      if(!player.folded){
        player.folded = true;
        G.currentPlayer = getNextActivePlayer(G, ctx);
      } 
    },
    bet({G, ctx}, amount: number) {
      const player = G.players[parseInt(ctx.currentPlayer)];
      if (!player.folded && player.chips >= amount && amount > 0) {
        player.chips -= amount;
        player.bet += amount;
        G.pot += amount;
        G.currentPlayer = getNextActivePlayer(G, ctx);
      }
    },
    check({G, ctx}) {
      G.currentPlayer = getNextActivePlayer(G, ctx);
    },
    dealCommunity({G, ctx}) {
      if(G.community.length < 5) {
        G.community.push(G.deck.pop()!);
      }
    },
    resetRound ({G, ctx}) {
      const deck = getShuffledDeck();
      G.players.forEach( p => {
        p.hand = [deck.pop()!, deck.pop()!];
        p.bet = 0;
        p.folded = false;
      });
      G.deck = deck;
      G.pot = 0;
      G.community = [];
      G.currentPlayer = '0';
      G.phase = 'playing';
    },
  },
   turn: {
    activePlayers: { all: 'default' },
    moveLimit: 1,
    order: {
      first: () => 0,
      next: (context) => {
        const { G } = context as { G: PokerGameState };
        let idx = typeof context.previous === "number" ? context.previous : 0;
        for (let i = 1; i < G.players.length; i++) {
          const nextIdx = (idx + i) % G.players.length;
          if (!G.players[nextIdx].folded) return nextIdx;
        }
        return undefined;
      }
    }
  },
  endIf: ({G, ctx}) => {
        const active = G.players.filter(p => !p.folded);
        if(active.length <= 1) return {winner:active[0]?.id};
        return;
      },
};

function getNextActivePlayer(G: PokerGameState, ctx: Ctx, current?: string): string {
  const total = G.players.length;
  let idx = current ? parseInt(current) : parseInt(ctx.currentPlayer);
  for(let i = 1; i < total; i++) {
    const next = (idx + i) % total;
    if(!G.players[next].folded) return next.toString();
  }
  return current || ctx.currentPlayer;
}