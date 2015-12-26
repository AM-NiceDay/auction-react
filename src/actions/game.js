export const START_GAME = 'START_GAME';
export const JOIN_GAME = 'JOIN_GAME';
export const GET_GAME = 'GET_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';

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
  };
}

export function joinGame(room) {
  return {
    type: JOIN_GAME,
    game: {
      owner: room.owner,
      players: room.players
    }
  };
}

export function getGame() {
  return {
    type: GET_GAME,
    meta: {
      remote: true
    }
  };
}

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
    game
  }
}
