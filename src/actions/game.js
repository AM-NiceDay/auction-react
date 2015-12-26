export const START_GAME = 'START_GAME';
export const JOIN_GAME = 'JOIN_GAME';

export function startGame(room) {
  return {
    type: START_GAME,
    game: {
      owner: room.owner,
      players: room.players
    },
    meta: {
      remote: true
    }
  }
}

export function joinGame(room) {
  return {
    type: JOIN_GAME,
    game: {
      owner: room.owner,
      players: room.players
    }
  }
}
